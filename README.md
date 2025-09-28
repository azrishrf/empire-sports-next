# 🏃‍♂️ Empire Sports - Next.js E-commerce Platform

A modern, full-featured sports equipment e-commerce website built with Next.js 14, Firebase, and TypeScript. Features a comprehensive product catalog, user authentication, shopping cart with animations, and a powerful admin dashboard with data migration capabilities.

## ✨ Features

### 🛍️ Shopping Experience

- **Product Catalog**: Browse products by categories (Basketball, Running, Clothing, Sneakers, Sandals)
- **Smart Search**: Search products by name, brand, or category
- **Product Sorting**: Sort by newest, price (low to high), price (high to low), and name
- **Product Details**: Comprehensive product pages with images and specifications
- **Shopping Cart**: Add/remove items with smooth animations and persistent state
- **Animated Cart Removal**: Smooth fade-out and slide-up animations when removing items
- **Secure Checkout**: Integrated payment processing with ToyyibPay gateway
- **Payment Tracking**: Real-time payment status with success/failure handling

### 🔐 Authentication & User Management

- **Firebase Authentication**: Secure user registration and login
- **Protected Routes**: Authentication-required pages with automatic redirects
- **User Context**: Global authentication state management
- **Persistent Sessions**: Automatic login persistence across browser sessions

### 📱 User Interface

- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Interactive Components**: Hover effects, loading states, and smooth transitions
- **Breadcrumb Navigation**: Easy navigation with breadcrumb trails
- **Header/Footer**: Consistent navigation and branding across all pages

### 🔥 Firebase Integration

- **Firestore Database**: Real-time product data storage and retrieval
- **Timestamp Management**: Proper handling of creation and update timestamps
- **Data Serialization**: Server-side rendering compatible data handling
- **Security Rules**: Proper Firestore security configuration

### 🛠️ Admin Dashboard

- **Data Migration**: One-click migration from JSON to Firestore database
- **Authentication Protected**: Admin routes require user authentication
- **Batch Operations**: Efficient bulk data operations with progress feedback
- **Error Handling**: Comprehensive error reporting and user feedback

### 🎨 Advanced Features

- **TypeScript**: Full type safety throughout the application
- **Server Components**: Optimized performance with Next.js 14 app router
- **Client Components**: Interactive features with proper hydration
- **Context Management**: Global state for cart and authentication
- **Custom Hooks**: Reusable logic for authentication and cart management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/azrishrf/empire-sports-next.git
cd empire-sports-next
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up Firebase**
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication and Firestore
   - Copy your Firebase config to `lib/firebase.ts`

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### First-Time Setup

1. **Create an account** at `/auth`
2. **Browse products** and test the shopping cart functionality

## 🛒 Usage Guide

### Shopping Flow

1. **Browse Products**: Visit `/collections` or specific categories like `/collections/basketball`
2. **View Details**: Click on any product to see detailed information
3. **Add to Cart**: Use the "Add to Cart" button on product pages
4. **Manage Cart**: Visit `/cart` to review, modify, or remove items
5. **Enjoy Animations**: Watch smooth animations when removing cart items

## 🧪 Tech Stack

### Frontend

- **[Next.js 14](https://nextjs.org/)** - React framework with app router
- **[React 18](https://reactjs.org/)** - UI library with hooks and context
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Backend & Database

- **[Firebase](https://firebase.google.com/)** - Backend-as-a-Service platform
- **[Firestore](https://firebase.google.com/products/firestore)** - NoSQL document database
- **[Firebase Auth](https://firebase.google.com/products/auth)** - Authentication service

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

## 🔧 Configuration

### Firebase Setup

Update `lib/firebase.ts` with your Firebase configuration:

```typescript
const firebaseConfig = {
  // Your Firebase config object
};
```

### Environment Variables

Create a `.env.local` file for sensitive configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

### 💳 Payment Integration

- **ToyyibPay Gateway**: Malaysian payment gateway integration
- **Secure Payments**: Environment-based configuration for API keys
- **Payment Status**: Real-time payment status checking and callbacks
- **Success/Failure Pages**: Dedicated pages for payment outcomes
- **Transaction Tracking**: Complete payment flow with order tracking

## 🔧 Payment Setup

To configure ToyyibPay payments:

1. Register at [ToyyibPay Developer Portal](https://dev.toyyibpay.com/)
2. Get your Secret Key and Category Code
3. Update your `.env.local` file:

```env
TOYYIBPAY_SECRET_KEY=your_secret_key_here
TOYYIBPAY_CATEGORY_CODE=your_category_code_here
```

### Payment Flow

1. **Cart**: Users add items and proceed to checkout
2. **Payment Creation**: API creates payment bill with ToyyibPay
3. **Payment Page**: Users redirected to ToyyibPay payment page
4. **Callback Handling**: Payment status updates handled via webhooks
5. **Success/Failure**: Users redirected to appropriate result pages

## 🚀 Deployment

This project is optimized for deployment on:

- **[Vercel](https://vercel.com/)** (recommended for Next.js)
- **[Netlify](https://netlify.com/)**
- **[Firebase Hosting](https://firebase.google.com/products/hosting)**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational and demonstration purposes. Feel free to use it as a learning resource or starting point for your own e-commerce projects.

## 🙏 Acknowledgments

- Product images and branding are for demonstration purposes
- Built with modern web development best practices
- Inspired by leading e-commerce platforms
