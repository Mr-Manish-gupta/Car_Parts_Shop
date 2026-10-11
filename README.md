# 🚗 CarParts Pro — Full-Stack Automotive E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-0C2340?style=for-the-badge&logo=razorpay&logoColor=blue)](https://razorpay.com/)

An end-to-end, enterprise-grade e-commerce marketplace engineered specifically for car enthusiasts, mechanics, and spare parts retailers. Built with a scalable micro-monolith architecture featuring a **Next.js 15 (TypeScript)** customer portal and a robust **Spring Boot (Java)** RESTful backend backed by **PostgreSQL**.

---

## 🌟 Key Features

### 🚘 Precise Vehicle Compatibility System
- **Vehicle Matcher**: Filter thousands of auto parts by Year, Make, Model, and Fuel/Engine variant.
- **Fitment Guarantee Indicator**: Visual indicators to confirm exact fitment before checkout, reducing returns.

### 🛒 Complete Shopping Experience
- **Interactive Product Catalog**: Instant search, category filters, brand filtering, and real-time inventory status.
- **Dynamic Cart & Wishlist**: Persistent cart and wishlist with seamless guest-to-authenticated transitions.
- **Coupons & Discounts**: Real-time coupon code validation and instant price recalculations.
- **Review & Ratings**: Customer reviews with verified purchase tags.

### 💳 Secure Checkout & Razorpay Integration
- Integrated online payment gateway via **Razorpay**.
- Automatic order creation, signature verification, and secure transaction lifecycle.
- Multiple payment modes supported: UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).

### 🏪 Multi-Vendor & Seller Dashboard
- **Seller Onboarding**: Dedicated application workflow for new vendors (`Become a Seller`).
- **Seller Hub**: Manage product listings, inventory levels, order dispatches, and sales analytics.

### 🛡️ Administrative Control Center
- **Admin Dashboard**: Comprehensive control panel to oversee users, manage seller approvals, review products, curate categories, and handle refund workflows.
- **Role-Based Access Control (RBAC)**: Secure access separation (`ROLE_USER`, `ROLE_SELLER`, `ROLE_ADMIN`) using Spring Security & JWT.

---

## 🏗️ Architecture & Project Structure

```text
Car_Parts_Shop/
│
├── Server_side/                      # Spring Boot Backend (REST API)
│   ├── src/main/java/com/carparts/
│   │   ├── config/                   # Security, CORS, and Cloudinary/App configs
│   │   ├── controller/               # REST API Endpoints (Auth, Products, Orders, Admin, etc.)
│   │   ├── entity/                   # JPA Entities (User, Product, Car, Order, Payment, etc.)
│   │   ├── repository/               # Spring Data JPA Repositories
│   │   ├── security/                 # JWT Authentication Filter & UserDetails
│   │   └── service/                  # Business Logic Layer
│   ├── src/main/resources/
│   │   └── application.properties    # Centralized environment-driven configuration
│   └── pom.xml                       # Maven Dependencies
│
└── User_view/                        # Frontend Application (Next.js 15)
    ├── src/app/                      # Next.js App Router (Shop, Cart, Checkout, Admin, Seller)
    ├── src/components/               # Reusable UI components (CarSelector, Navbar, Filters)
    ├── src/context/                  # Context API (AuthContext, CartContext, CarContext)
    ├── src/services/                 # Axios API Service Layer
    └── package.json                  # Frontend Dependencies
```

---

## 💻 Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React |
| **Backend** | Spring Boot 3, Java 21, Spring Security, Spring Data JPA, Hibernate |
| **Database** | PostgreSQL |
| **Authentication** | Stateless JWT (JSON Web Tokens) with BCrypt password hashing |
| **Payment Gateway** | Razorpay Payment API & Webhooks |
| **Build & Tooling** | Maven, npm, Git |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or later) & **npm**
- **Java Development Kit (JDK)** 21
- **PostgreSQL** (v14+ running on port `5432`)
- **Maven** (optional, wrapper included)

---

### 1️⃣ Backend Setup (`Server_side`)

1. **Navigate to the backend directory**:
   ```bash
   cd Server_side
   ```

2. **Configure Database**:
   Create a PostgreSQL database named `car_parts_db`:
   ```sql
   CREATE DATABASE car_parts_db;
   ```

3. **Configure Environment / Local Properties**:
   Create a file `src/main/resources/application-local.properties` (this file is ignored by Git):
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/car_parts_db
   spring.datasource.username=postgres
   spring.datasource.password=your_db_password

   razorpay.key.id=your_razorpay_key_id
   razorpay.key.secret=your_razorpay_secret
   ```

4. **Run the Application**:
   ```bash
   ./mvnw spring-boot:run
   ```
   *Backend server will start at:* `http://localhost:8087`

---

### 2️⃣ Frontend Setup (`User_view`)

1. **Navigate to the frontend directory**:
   ```bash
   cd User_view
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8087
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   *Frontend will be live at:* `http://localhost:3000`

---

## 🔒 Security Best Practices
- **No hardcoded secrets**: All API keys, database credentials, and payment gateway secrets are managed strictly through environment variables.
- **Git Protection**: Sensitive environment files (`.env*`, `application-local.properties`) are strictly excluded via `.gitignore`.
- **JWT Protection**: All secure endpoints are guarded with cryptographically signed tokens and role-based validation.


---

## 👨‍💻 Author
Developed with ❤️ by **[Manish Gupta](https://github.com/Mr-Manish-gupta)**.  
*Feel free to star ⭐ the repository if you found this project helpful!*
