# 👞 ShoeStore - An eCommerce Platform (Frontend)

## 📚 Table of Contents

- [Description](#-description)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Setup and Installation](#-setup-and-installation)

## 📖 Description

ShoeStore, an innovative e-commerce application, is designed to provide users with a seamless and enjoyable experience while shopping for shoes online. In this application has three categories of shoes for now which are Running Shoes, Football Shoes and Sneakers. Users can find their desired products by filtering with name or price or by sorting with order ( asc or desc ). Only authenticated users will be able to purchase products. The project focuses on selling a diverse range of shoes and incorporates various technologies and methodologies to ensure optimal performance and user satisfaction.

## 🔆 Features

- **Product Management:** 
- Users can view detailed information about individual products.
 - Products can be added to a shopping cart for future purchase.

- **User Interaction:** Users can add shoes to their favorites or shopping cart, enhancing the personalization of their shopping experience.

- **Authentication:** To make a purchase, users are required to log in or register, ensuring a secure and personalized transaction process.

- **Customized Payment System:** The project incorporates a customized payment system, prioritizing functionality over third-party gateways to streamline the user experience.

## 💻 Technology Stack

- Next.js 13
- Tailwind CSS
- EasyPeasy
- PropTypes
- Axios
- React Toastify
- React Icons
- JS Cookies
- Swiper

## 🚀 Setup and Installation

Follow these steps to set up the ShoeStore backend on your local machine:

### 1. `Clone the Repository:`

```
https://github.com/Mohosin999/ShoeStore-eCommerce-Project-Frontend.git
```

### 2. `Navigate to the Project Directory:`

Go to your project directory that your already created.

```
cd your-repo
```

### 3. `Install Dependencies:`

Install all dependencies by typing this in your terminal.

```
yarn
```

### 4. `Configure Environment Variables:`

Create a `.env` file in the root directory and set the following variables:

```
NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337/api

NEXT_PUBLIC_STRAPI_BEAREER_TOKEN=<your strapi token>
```

### 6. `Start the Server:`

```
yarn dev
```

### 7. `Access the Application:`

Open your browser and visit [http://localhost:3000](http://localhost:3000).
