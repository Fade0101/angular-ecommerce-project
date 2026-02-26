# 🐋 MARNA E-Commerce Store

A modern e-commerce web application built with **Angular v17+** and **JSON Server**. This project features a full shopping flow, including user authentication, product details, stock management, and an admin dashboard.

## 🚀 Features
- **Dynamic Product Catalog**: Fetching live data from a local API.
- **Product Details**: Dedicated pages for each item with stock and rating info.
- **Smart Shopping Cart**: Global cart service that persists across the app.
- **Admin Dashboard**: Full CRUD (Create, Read, Update, Delete) operations for managing products.
- **Stock Management**: Automatic stock reduction upon checkout.
- **Responsive Design**: Clean UI with custom animations and hover effects.

## 🛠️ Tech Stack
- **Frontend**: Angular (Standalone Components)
- **Styling**: CSS3 (Flexbox & Grid) Some Bootstrap Compnents
- **Database/API**: JSON Server (Fake REST API)
- **State Management**: RxJS (BehaviorSubjects)

## 💻 Setup and Installation

Follow these steps to get the project running on your local machine:

### 1. Clone the repository
```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd marna-ecommerce
npm install
npx json-server --watch db.json --port 3000
ng serve