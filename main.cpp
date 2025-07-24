#include "crow.h"
#include <cpr/cpr.h>
#include <nlohmann/json.hpp>
#include <iostream>
#include <string>

// ADD THIS ENTIRE STRUCT
struct CorsMiddleware {
    struct context {};

    void before_handle(crow::request& /*req*/, crow::response& /*res*/, context& /*ctx*/) {
        // This runs before your route handlers
    }

    void after_handle(crow::request& req, crow::response& res, context& /*ctx*/) {
        // This runs after your route handlers
        // We add the required headers here
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Headers", "Content-Type");

        // Handle browser "pre-flight" requests
        if (req.method == "OPTIONS"_method) {
            res.code = 204; // No Content
            res.end();
        }
    }
};

// Use nlohmann::json for convenience
using json = nlohmann::json;

// --- API Configuration ---
const std::string FINNHUB_API_KEY = "d1vegapr01qqgeel38dgd1vegapr01qqgeel38e0";
const std::string NEWS_API_KEY = "01d6c291947f4a2eb1a6b76885a02fe4";
const std::string FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const std::string NEWS_API_BASE_URL = "https://newsapi.org/v2";

// --- Helper Function to Fetch and Parse Data ---
json fetchData(const std::string& url) {
    cpr::Response r = cpr::Get(cpr::Url{url});
    if (r.status_code == 200) {
        return json::parse(r.text);
    }
    // Return an error object if the request fails
    return {{"error", true}, {"status_code", r.status_code}, {"message", "Failed to fetch data"}};
}




int main() {
    crow::App<CorsMiddleware> app;

    // --- API Route for Stock Quotes ---
    // Example: /api/quote/AAPL
    CROW_ROUTE(app, "/api/quote/<string>")
    ([&](const std::string& symbol) {
        std::string url = FINNHUB_BASE_URL + "/quote?symbol=" + symbol + "&token=" + FINNHUB_API_KEY;
        json data = fetchData(url);
        
        // Add the symbol to the response for the frontend
        data["symbol"] = symbol;

        return crow::response(data.dump());
    });

    // --- API Route for Stock-related News ---
    // Example: /api/news/TSLA
    CROW_ROUTE(app, "/api/news/<string>")
    ([&](const std::string& symbol) {
        // Construct the URL with headers for authorization
        std::string url = NEWS_API_BASE_URL + "/everything?q=" + symbol + "&sortBy=publishedAt&pageSize=10";
        cpr::Response r = cpr::Get(cpr::Url{url}, cpr::Header{{"Authorization", NEWS_API_KEY}});

        if (r.status_code == 200) {
            return crow::response(r.text);
        }
        json error_data = {{"error", true}, {"status_code", r.status_code}, {"message", "Failed to fetch news"}};
        return crow::response(500, error_data.dump());
    });

    // --- Enable CORS for all routes ---
    // This is crucial for allowing the frontend to access the API
    // --- Enable CORS for all routes ---
    // This is the correct modern syntax for Crow middleware
    // --- Enable CORS for all routes ---


    // Set the port and run the server
    app.port(18080).multithreaded().run();
    
    std::cout << "Server running on port 18080" << std::endl;
}