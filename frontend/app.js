document.addEventListener('DOMContentLoaded', () => {
    const stockSymbolInput = document.getElementById('stock-symbol-input');
    const addStockButton = document.getElementById('add-stock-button');
    const stockListDiv = document.getElementById('stock-list');
    const newsFeedDiv = document.getElementById('news-feed');
    const newsHeader = document.getElementById('news-header');

    // --- State Management ---
    let watchlist = ['AAPL', 'GOOGL', 'MSFT', 'TSLA']; // Default watchlist
    let activeStock = null;

    // --- API Configuration ---
    const API_BASE_URL = 'http://localhost:18080/api';

    // --- Functions ---

    // Fetches quote for a single stock and updates or creates its card
    const fetchStockQuote = async (symbol) => {
        try {
            const response = await fetch(`${API_BASE_URL}/quote/${symbol}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            updateStockCard(data);
        } catch (error) {
            console.error(`Error fetching quote for ${symbol}:`, error);
        }
    };

    // Fetches news for the active stock
    const fetchStockNews = async (symbol) => {
        newsHeader.textContent = `Latest News for ${symbol}`;
        newsFeedDiv.innerHTML = `<p class="placeholder-text">Loading news...</p>`;
        try {
            const response = await fetch(`${API_BASE_URL}/news/${symbol}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            displayNews(data.articles);
        } catch (error) {
            console.error(`Error fetching news for ${symbol}:`, error);
            newsFeedDiv.innerHTML = `<p class="placeholder-text">Could not load news.</p>`;
        }
    };

    // Renders the stock cards on the page
    const renderWatchlist = () => {
        stockListDiv.innerHTML = ''; // Clear existing list
        watchlist.forEach(symbol => {
            const stockCard = document.createElement('div');
            stockCard.className = 'stock-card';
            stockCard.id = `stock-${symbol}`;
            stockCard.innerHTML = `
                <div>
                    <div class="symbol">${symbol}</div>
                </div>
                <div class="price-info">
                    <div class="price">Loading...</div>
                    <div class="change"></div>
                </div>
            `;
            // Add click event to fetch news
            stockCard.addEventListener('click', () => handleStockClick(symbol));
            stockListDiv.appendChild(stockCard);
            
            fetchStockQuote(symbol); // Initial fetch
        });
    };

    // Updates a specific stock card with new data
    const updateStockCard = (data) => {
        const stockCard = document.getElementById(`stock-${data.symbol}`);
        if (!stockCard) return;

        const priceEl = stockCard.querySelector('.price');
        const changeEl = stockCard.querySelector('.change');
        
        const price = data.c.toFixed(2); // Current price
        const change = data.d.toFixed(2); // Change
        const changePercent = data.dp.toFixed(2); // Percent change

        priceEl.textContent = `$${price}`;
        changeEl.textContent = `${change} (${changePercent}%)`;
        
        // Color coding based on price change
        if (change > 0) {
            changeEl.className = 'change price-up';
        } else if (change < 0) {
            changeEl.className = 'change price-down';
        } else {
            changeEl.className = 'change';
        }
    };

    // Displays news articles in the news panel
    const displayNews = (articles) => {
        newsFeedDiv.innerHTML = '';
        if (!articles || articles.length === 0) {
            newsFeedDiv.innerHTML = `<p class="placeholder-text">No news found for this stock.</p>`;
            return;
        }

        articles.forEach(article => {
            const articleEl = document.createElement('div');
            articleEl.className = 'news-article';
            articleEl.innerHTML = `
                <a href="${article.url}" target="_blank">${article.title}</a>
                <p>${article.source.name} - ${new Date(article.publishedAt).toLocaleDateString()}</p>
            `;
            newsFeedDiv.appendChild(articleEl);
        });
    };

    // Handles adding a new stock to the watchlist
    const handleAddStock = () => {
        const newSymbol = stockSymbolInput.value.toUpperCase().trim();
        if (newSymbol && !watchlist.includes(newSymbol)) {
            watchlist.push(newSymbol);
            stockSymbolInput.value = '';
            renderWatchlist();
        }
    };

    // Handles clicking on a stock card
    const handleStockClick = (symbol) => {
        activeStock = symbol;
        // Update active class for visual feedback
        document.querySelectorAll('.stock-card').forEach(card => card.classList.remove('active'));
        document.getElementById(`stock-${symbol}`).classList.add('active');
        fetchStockNews(symbol);
    };

    // --- Event Listeners ---
    addStockButton.addEventListener('click', handleAddStock);
    stockSymbolInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddStock();
    });

    // --- Initialization ---
    renderWatchlist(); // Initial render of the watchlist

    // Set an interval to refresh stock prices every 30 seconds
    setInterval(() => {
        console.log('Refreshing stock data...');
        watchlist.forEach(fetchStockQuote);
    }, 30000); 
});