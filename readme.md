# Stock Watchlist Dashboard

A full-stack web application designed to track a custom watchlist of stocks and display relevant financial news in real-time.

---

## Project Features

-   Real-time price updates fetched from a live financial data API.
-   Dynamic front-end interface that updates without requiring a page refresh.
-   Integrated news feed that displays the latest articles for monitored stocks.
-   Clean, readable UI for at-a-glance market information.
-   Decoupled architecture with a C++ backend serving data to a JavaScript frontend.

---

## Tech Stack & APIs

-   **Frontend:** HTML5, CSS3, Vanilla JavaScript
-   **Backend:** C++ with Crow
-   **APIs:**
    -   **[Finnhub API](https://finnhub.io/)** for real-time stock quotes.
    -   **[NewsAPI](https://newsapi.org/)** for financial news.
-   **Dev Tools:** Visual Studio Code, Git

---

## Project Structure

This project uses a monorepo structure with a separate directory for the backend API and the frontend client.

```txt
/stock-watchlist-webapp/
│
├── backend/                  # C++ backend application
│   ├── main.cpp              # C++ app entry point and API routes
│   └── CMakeLists.txt        # CMake build configuration
│
├── frontend/                 # JavaScript frontend application
│   ├── app.js                # JavaScript logic
│   ├── index.html            # HTML structure
│   └── style.css             # CSS for styling
│
├── .gitignore                # Global ignores
└── README.md                 # This file
