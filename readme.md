# Stock Watchlist Dashboard

A full-stack web application designed to track a custom watchlist of stocks and display relevant financial news in real-time.

---

## Project Features

-   Real-time price updates fetched from a live financial data API.
-   Dynamic front-end interface that updates without requiring a page refresh.
-   Integrated news feed that displays the latest articles for monitored stocks.
-   Clean, readable UI for at-a-glance market information.
-   Decoupled architecture with a Python backend serving data to a JavaScript frontend.

---

## Tech Stack & APIs

-   **Frontend:** HTML5, CSS3, Vanilla JavaScript 
-   **Backend:** C++ Crow
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
├── backend/                  # Flask backend application
│   ├── .gitignore            # Python-specific ignores
│   ├── app.py                # Flask app entry point and API routes
│   ├── config.py             # API keys and watchlist configuration
│   └── requirements.txt      # Python dependencies (Flask, requests)
│
├── frontend/                 # JavaScript frontend application
│   ├── public/               # Static assets (index.html, favicon)
│   ├── src/                  # Source code (JavaScript, CSS)
│   ├── .gitignore            # Node/frontend-specific ignores
│   └── package.json          # Frontend dependencies and scripts (if using a bundler)
│
├── .gitignore                # Global ignores (e.g., .env files, OS files)

└── README.md                 # This file
