
# Cryptocurrency Data Fetcher

This project is a server-side application built with Node.js and MongoDB. It fetches real-time cryptocurrency data (Bitcoin, Matic-network, and Ethereum) from the CoinGecko API and stores it in a MongoDB database. A background job runs every 2 hours to update the cryptocurrency data, and two API endpoints are provided to retrieve the data and calculate the standard deviation of the price.

## [Demo Video](https://drive.google.com/drive/folders/1tW07mbom0QHQw5NKQe3bfw--kVO7yRAM)

## Features

- Fetches current price, market cap, and 24-hour price change for Bitcoin, Matic, and Ethereum using the CoinGecko API.
- Background job that fetches and stores cryptocurrency data every 2 hours.
- API to retrieve the latest cryptocurrency data.
- API to calculate the standard deviation of the price over the last 100 records.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Axios (for API calls)
- Node-cron (for background job scheduling)
- CoinGecko API

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB (MongoDB Atlas recommended for deployment)
- Git (optional, for cloning the repository)

### 1. Clone the Repository

```bash
git clone https://github.com/harsh-kumar-patwa/KoinX.git
cd KoinX
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add the following:

```
MONGO_URI=your_mongodb_connection_string
x_cg_demo_api_key=your_coingecko_api_key
```

Replace `your_mongodb_connection_string` with your actual MongoDB URI (e.g., from MongoDB Atlas) and `x_cg_demo_api_key` with your CoinGecko Api key.

### 4. Run the Application Locally

Start the application by running:

```bash
node index.js
```

### 5. Deploy the Application

You can deploy this application to cloud platforms such as Render or Heroku. For detailed instructions on deploying to Render, see the **Deployment** section below.

## API Endpoints

### 1. Fetch Latest Cryptocurrency Stats

**Endpoint**: `/stats`

**Method**: `GET`

**Query Parameters**:

- `coin`: The cryptocurrency (e.g., `bitcoin`, `matic-network`, or `ethereum`).

**Sample Request**:

```bash
GET /stats?coin=bitcoin
```

**Sample Response**:

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "change24h": 3.4
}
```

### 2. Calculate Standard Deviation of Price for Last 100 Records

**Endpoint**: `/deviation`

**Method**: `GET`

**Query Parameters**:

- `coin`: The cryptocurrency (e.g., `bitcoin`, `matic-network`, or `ethereum`).

**Sample Request**:

```bash
GET /deviation?coin=bitcoin
```

**Sample Response**:

```json
{
  "deviation": 4082.48
}
```

## Background Job

- The background job runs every 2 hours to fetch the latest cryptocurrency data from CoinGecko and store it in the database.
- When the application starts, the job runs immediately once, then continues to run every 2 hours.

## Deployment

### 1. Deploy to Render

1. Create an account on Render.
2. Connect your GitHub repository.
3. Add your `MONGO_URI` and `x_cg_demo_api_key` environment variable in the Render settings.
4. Render will automatically deploy your application.

