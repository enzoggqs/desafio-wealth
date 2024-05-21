# Coin Price Tracker

## Overview
The Coin Price Tracker is a web application that allows users to check the current and historical prices of various cryptocurrencies. Users can select a specific cryptocurrency, such as Bitcoin or Ethereum, and view its current price in USD. Additionally, users can also retrieve historical price data for a specific date and time.

### Deploy: https://desafio-wealth.vercel.app/

## Features
- Current Price: Users can select a cryptocurrency from the dropdown menu to view its current price in USD.
- Historical Price: Users can input a date and time to retrieve historical price data for a selected cryptocurrency.
- Responsive Design: The application is designed to work seamlessly across different screen sizes, including desktop and mobile devices.

## Technologies Used
Vue.js: The application is built using Vue.js, a progressive JavaScript framework for building user interfaces.
Tailwind CSS: Tailwind CSS is used for styling the application, providing a utility-first CSS framework that enables rapid development.
Axios: Axios is used for making HTTP requests to fetch current and historical price data from the CoinGecko API.
Vite: Vite is a build tool that is used to serve and build the application. It offers fast build times and hot module replacement (HMR) out of the box.
Vue Test Utils: Vue Test Utils is used for unit testing Vue components. It provides utilities for mounting components, interacting with them, and making assertions.

## Simplicity and Single Page Design
The application is designed as a single-page application without using Vue Router. This decision was made because the requirements of the application were simple and did not necessitate additional pages or complex navigation. In scenarios where the application might involve more complex features such as user registration, login, or multi-step processes, using a router would be essential. For this project, however, consolidating all features on a single page made the application more straightforward and user-friendly.

## Installation

1. Clone the repository:
```git clone https://github.com/enzoggqs/desafio-wealth```

2. Navigate to the project directory:
```cd desafio-wealth```

3. Install dependencies:
```npm install```

4. Start the development server:
```npm run dev```

5. Open your browser and navigate to http://localhost:5173 to view the application.
