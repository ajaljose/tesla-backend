# 🏎️ Tesla - Backend API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Data Validation](https://img.shields.io/badge/yup-validation-orange?style=for-the-badge)

A high-performance, enterprise-ready RESTful API designed for a premium vehicle configuration platform. This system manages complex multi-dimensional data models, ensuring strict data integrity and fluid discovery experiences through advanced SQL orchestration.

---

## ⚡ Quick Start

### ⚙️ Environment Setup
1. Copy `.env.example` to `.env` (or create one) and configure:
   ```env
   PORT=5000
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=tesla_db
   DB_HOST=localhost
   ```

### 🏎️ Execution
```bash
# Install dependencies
npm install

# Run in Development mode (Nodemon)
npm run dev

# Run in Production mode
npm run start
```

---

## 🏗️ System Architecture

The project follows a decoupled **Layered Architecture** (Model-Service-Controller) to optimize for scalability and developer velocity.

## Architecture Flow

- Client Apps  
- Express Routes  
- Middleware (Yup Validation / Auth)  
- Controllers  
- Services (Business Logic)  
- Sequelize Transactions  
- Sequelize Models  
- Database (MySQL / SQLite)

### Key Engineering Pillars

#### 🛡️ Transactional Integrity
Implemented atomic **managed transactions** in the `createVehicleDetails` layer. A single recursive API call orchestrates simultaneous writes to four normalized tables (`Vehicles`, `Stats`, `Features`, `Colors`), guaranteeing a 100% "all-or-nothing" execution pattern.

#### 🔍 Dynamic Query Engine
Built a sophisticated search service using **Sequelize Operators (`Op`)**. It supports multi-index partial matching, range-based filtering (e.g., minimum vehicle range), and dynamic category filtering with optimized SQL execution.

#### 💎 Unified Schema Validation
Leveraged a custom **Yup Resolver Middleware** to decouple validation logic from route handlers. This ensures that only schema-compliant data reaches the service layer, reducing defensive programming overhead.

---

## 🚀 Key Modules

### 🚘 Vehicle Management
- **One-Stop Creation**: Comprehensive ingestion of vehicle metadata, performance stats, multi-media features, and color variants.
- **Random Discovery**: Weighted randomization logic for "Showcase" features.
- **Smart Search**: Optimized search with configurable pagination and metadata responses.

### 📊 Attribute Discovery
- Optimized endpoints for extracting unique system attributes (available models, types).

---

## 🔌 API Documentation

### Exploration API

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/v1/vehicles/search` | `GET` | Paginated search with complex filters |
| `/api/v1/vehicles/random` | `GET` | Discover a featured vehicle |
| `/api/v1/vehicles/:slug` | `GET` | Detailed technical specifications |
| `/api/v1/vehicles/models` | `GET` | List all unique available models |
| `/api/v1/vehicles/types` | `GET` | List all unique available types |



---
