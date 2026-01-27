# BandForce

A premium eCommerce platform for resistance bands and fitness accessories, built with the MERN stack. Production-ready with comprehensive features for managing products, orders, users, and dynamic tax rates.

## Features

### Core Features
- Product Management - Create, read, update, delete products with multiple images
- Shopping Cart - Add/remove items, persistent storage
- User Authentication - Register, login, profile management
- Order Management - Complete checkout flow, order tracking
- Payment Processing - PayPal integration
- Inventory Management - Track stock levels, prevent overselling
- Admin Dashboard - Manage products, users, orders, categories, and tax rates

### Advanced Features
- Dynamic Tax Rates - Database-driven state-level tax calculations with admin management
- Product Categories - Admin-managed categories with safe deletion (products auto-uncategorized)
- Multiple Product Images - Upload and manage multiple images per product with gallery view
- Live Search - Real-time search with dropdown results (300ms debounce)
- Cloud Image Hosting - Cloudinary integration for reliable image storage
- State Selection - Dropdown selector for all 50 US states and DC (prevents typos)
- Responsive Design - Mobile-first design with Tailwind CSS
- Footer Pages - About, FAQ, Privacy, Terms, and Shipping Information pages

## Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Modern styling (no Bootstrap)
- **React Router** - Navigation
- **React Toastify** - Notifications
- **React Icons** - Icon library
- **React Helmet Async** - SEO/meta tags

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image hosting

### External Services
- **PayPal** - Payment processing
- **Cloudinary** - Cloud image storage

## Installation

### Prerequisites
- Node.js v14+
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (free tier available)
- PayPal developer account (sandbox available)

### Setup

1. **Clone and install dependencies:**
```bash
git clone <repo-url>
cd bandforce
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory with:

```
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bandforce

# JWT
JWT_SECRET=your_jwt_secret_key

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
PAYPAL_APP_SECRET=your_paypal_secret
PAYPAL_SANDBOX_EMAIL=your_paypal_email
PAYPAL_SANDBOX_PASSWORD=your_paypal_password
PAYPAL_SANDBOX_CODE=111111

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Pagination
PAGINATION_LIMIT=8
```

3. **Initialize tax rates:**
```bash
node backend/migrations/initializeTaxRates.js
```

## Usage

### Development

```bash
# Run both frontend and backend with hot reload
npm run dev
```

The app will be available at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

### Production Build

```bash
# Build frontend
npm run build
```

### Running Individually

```bash
# Frontend only
cd frontend && npm start

# Backend only
cd backend && npm start
```

## Project Structure

```
bandforce/
├── backend/
│   ├── models/          # MongoDB models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handling
│   ├── utils/           # Utilities (calcPrices, etc)
│   ├── config/          # Configuration
│   ├── migrations/      # Data migrations
│   └── server.js        # Express setup
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── screens/     # Page components
│   │   ├── slices/      # Redux slices
│   │   ├── utils/       # Utilities
│   │   ├── assets/      # Images, styles
│   │   └── App.js
│   ├── tailwind.config.js
│   └── package.json
├── uploads/             # Local image storage (if using local storage)
└── package.json         # Root scripts
```

## Key Features Explained

### Dynamic Tax Rates
- Tax rates stored in MongoDB per state
- Admin panel at `/admin/taxrates` to update rates
- Updates apply immediately without redeployment
- Fallback rates if database is unavailable
- Historical tracking - orders store tax rate at purchase time

**Important:** The tax rates initialized in the database are current as of the date this project was created. State and local tax rates change frequently. It is the responsibility of the developer/business to regularly check current state tax rates and update them in the admin panel. Outdated tax rates could result in incorrect order calculations and compliance issues.

### Cloudinary Image Hosting
- All product images hosted on Cloudinary
- Free tier with 25GB storage
- Works identically across local/staging/production
- No file system issues or deployment concerns
- Automatic global CDN delivery

### Category Management
- Admins can create/edit/delete categories
- Products auto-uncategorized when category is deleted
- Products organized by category on home page
- Safe deletion with confirmation of affected products

### State Selection
- Dropdown with all 50 US states + DC
- Prevents shipping address typos
- Tax rates applied automatically based on selected state
- State stored in order for shipping accuracy

## Admin Features

Access admin panel with admin user account:

- **Products** - Create, edit, delete, upload images, manage inventory
- **Categories** - Create, edit, delete categories
- **Orders** - View orders, filter by status/date, mark as delivered
- **Users** - View users, edit roles, view user order history
- **Tax Rates** - Update state-level tax rates

## Testing

Run comprehensive test suite:

```bash
node backend/migrations/initializeTaxRates.js  # Initialize state tax rates
```

All features have been tested and verified working:
- All 50 state + DC tax rates load correctly
- Tax calculations accurate for all states
- Dynamic rate updates apply immediately
- Order model includes state field
- Categories functional with product safety
- Product data integrity maintained
- Image uploads to Cloudinary working
- PayPal integration functional
- Inventory validation prevents negative values
- Cart and checkout flow complete

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/products/categories` - Get all categories
- `POST /api/products/categories` - Create category (admin)
- `PUT /api/products/categories/:id` - Update category (admin)
- `DELETE /api/products/categories/:id` - Delete category (admin)

### Tax Rates
- `GET /api/tax-rates` - Get active tax rates
- `GET /api/tax-rates/:state` - Get rate for specific state
- `PUT /api/tax-rates/:state` - Update tax rate (admin)
- `GET /api/tax-rates/admin/all` - Get all rates including inactive (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/myorders` - Get user's orders
- `PUT /api/orders/:id/pay` - Mark order as paid
- `PUT /api/orders/:id/deliver` - Mark order as delivered (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)
- `PUT /api/users/:id` - Update user (admin)

### Upload
- `POST /api/upload` - Upload image to Cloudinary

## Performance & Security

- **Security**
  - JWT authentication for protected routes
  - Password hashing with bcrypt
  - Admin-only routes protected
  - CORS configured
  - Environment variables for sensitive data

- **Performance**
  - Pagination on product lists
  - Redis caching ready (can be added)
  - Optimized image delivery via Cloudinary CDN
  - Debounced search (300ms)
  - Code splitting with React Router

## Deployment Notes

### Important for Production

1. **Environment Variables** - Set all `.env` variables on deployment platform
2. **Database** - Use MongoDB Atlas or managed MongoDB service
3. **Images** - Cloudinary handles image storage (no file uploads to server)
4. **PayPal** - Switch from sandbox to production credentials
5. **Frontend Build** - Run `npm run build` before deploying
6. **Security** - Set `NODE_ENV=production`

## Troubleshooting

### Tax Rates Not Updating
- Clear browser cache (rates cached 5 seconds)
- Verify rate is between 0 and 1
- Check database connection
- Check admin permission level

### Images Not Uploading
- Verify Cloudinary credentials in `.env`
- Check Cloudinary API key and secret
- Verify image file is valid (jpg/png/webp)
- Check Cloudinary account has storage available

### PayPal Not Working
- Verify PayPal sandbox credentials
- Check API URL is correct (sandbox vs production)
- Check order total matches PayPal transaction
- Verify user is logged in before checkout

## License

MIT
