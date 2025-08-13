# Stock Watchlist Dashboard

A full-stack web application designed to track a custom watchlist of stocks and display relevant financial news in real-time.

---

## Project Features

- Real-time price updates fetched from a live financial data API.
- Dynamic front-end interface that updates without requiring a page refresh.
- Integrated news feed that displays the latest articles for monitored stocks.
- Clean, readable UI for at-a-glance market information.
- Decoupled architecture with a C++ backend serving data to a JavaScript frontend.

---

## Tech Stack & APIs

- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **Backend:** C++ with Crow  
- **APIs:**
  - **[Finnhub API](https://finnhub.io/)** for real-time stock quotes.
  - **[NewsAPI](https://newsapi.org/)** for financial news.
- **Dev Tools:** Visual Studio Code, Git

---

## Project Structure

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

```
How to Run This Project
You will need to run the backend server and the frontend application separately.

1) Backend Setup
The backend is built with C++ and CMake. You'll need a C++ compiler, CMake, and the vcpkg package manager.

On macOS
Install Xcode Command Line Tools:
bash
xcode-select --install

Install Homebrew (if you don't have it):
bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Install CMake and vcpkg:
bash
brew install cmake vcpkg

Install Dependencies using vcpkg:
bash
vcpkg install crow cpr nlohmann-json

Build the Project:
Navigate to the backend directory and run the following commands. Replace [path to vcpkg] with the actual path to your vcpkg installation (you can find it with brew --prefix vcpkg).
bash
cd backend
mkdir build
cd build
cmake .. -DCMAKE_TOOLCHAIN_FILE=[path to vcpkg]/scripts/buildsystems/vcpkg.cmake
cmake --build .

Run the Server:
From the backend/build directory:
bash
./StockBackend
The server will be running at http://localhost:18080.

On Windows
Install Visual Studio 2019 or later:
Download from the Visual Studio website. Make sure to include the Desktop development with C++ workload.

Install vcpkg:
powershell
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
.\vcpkg integrate install

Install Dependencies using vcpkg:
powershell
.\vcpkg install crow:x64-windows cpr:x64-windows nlohmann-json:x64-windows

Build the Project:
Replace [path to vcpkg] with the full path to your vcpkg installation.
powershell
cd backend
mkdir build
cd build
cmake .. -DCMAKE_TOOLCHAIN_FILE=[path to vcpkg]\scripts\buildsystems\vcpkg.cmake
cmake --build . --config Release

Run the Server:
powershell
.\Release\StockBackend.exe
The server will be running at http://localhost:18080.

2) Frontend Setup
The frontend is built with standard HTML, CSS, and JavaScript. You just need a simple local server to run it. Python provides an easy-to-use built-in server.

Navigate to the frontend directory:
bash
cd frontend

Start the local server:
If you have Python 3:
bash
python3 -m http.server

If you have Python 2:
bash
python -m SimpleHTTPServer

Open in Browser:
Go to http://localhost:8000 in your web browser.
```
