cmake_minimum_required(VERSION 3.15)
project(StockBackend)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find necessary packages installed by vcpkg
find_package(Crow REQUIRED)
find_package(cpr REQUIRED)
find_package(nlohmann_json REQUIRED)

# Add the executable
add_executable(StockBackend main.cpp)

# Link the libraries to your executable
target_link_libraries(StockBackend PRIVATE Crow::Crow cpr::cpr nlohmann_json::nlohmann_json)

# Add command to show where the executable is after building
add_custom_command(TARGET StockBackend POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E echo "Executable is at $<TARGET_FILE:StockBackend>"
)