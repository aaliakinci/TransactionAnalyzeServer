# Transaction Analyze Server

## 🚀 Overview
Transaction Analyze Server is a **NestJS-based backend** for processing, normalizing, and analyzing financial transactions. The system uses AI-powered categorization and pattern detection to help users understand their spending habits.

## 📌 Features
- **Transaction Normalization**: Identifies merchants, categories, and flags transactions appropriately.
- **Pattern Detection**: Recognizes recurring transactions, subscriptions, and other spending patterns.
- **Swagger API Documentation**: Provides an interactive interface for exploring API endpoints.
- **CSV Upload Support**: Allows users to upload CSV files for bulk transaction analysis.
- **OpenAI & Mistral Integration**: AI-driven analysis for improved transaction classification.

## 🛠️ Technologies Used
- **NestJS** - TypeScript-based progressive Node.js framework.
- **Swagger** - API documentation and testing.
- **PapaParse** - Fast CSV parsing for transaction imports.
- **Axios** - HTTP client for external API requests.
- **OpenAI/Mistral AI** - AI-powered transaction analysis.
- **Docker** - Containerized deployment.

## 📖 API Documentation
The API is fully documented using Swagger. You can access the Swagger UI here:

🔗 **Swagger UI:** [http://localhost:3001/api](http://localhost:3001/api)

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/aaliakinci/TransactionAnalyzeServer.git
cd TransactionAnalyzeServer
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and set your OpenAI API key and other required environment variables:
```
OPENAI_API_KEY=your-api-key
MISTRAL_API_KEY=your-api-key
PORT=3000
```

### 4️⃣ Run the Server
```sh
npm run start:dev
```

The server will start on **http://localhost:3001**.

## 🔥 Example API Usage
### 🟢 Upload Transactions
#### Request:
```http
POST /upload
Content-Type: multipart/form-data
```
#### Response:
```json
{
  "normalized_transactions": [...],
  "detected_patterns": [...]
}
```

### 🟢 Get Normalized Merchant
#### Request:
```http
POST /analyze/merchant
Content-Type: application/json
```
#### Response:
```json
{
  "merchant": "Netflix",
  "category": "Entertainment",
  "sub_category": "Streaming Service",
  "confidence": 0.98,
  "is_subscription": true,
  "flags": ["subscription", "digital_service"]
}
``` 
## 👥 Contributing
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature/new-feature`).
5. Create a Pull Request.

## 📝 License
This project is **MIT Licensed**.