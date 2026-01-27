import express from 'express';
const router = express.Router();
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateProductPosition, createProductReview, deleteProductReview, updateProductReview, getTopProducts } from '../controllers/productController.js';
import { getCategories, getCategoryById, createCategory, updateCategory, updateCategoryPosition, deleteCategory } from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// Category routes
router.route('/categories').get(getCategories).post(protect, admin, createCategory);
router.route('/categories/:id/position').put(protect, admin, checkObjectId, updateCategoryPosition);
router.route('/categories/:id').get(checkObjectId, getCategoryById).put(protect, admin, checkObjectId, updateCategory).delete(protect, admin, checkObjectId, deleteCategory);

// Product routes
router.route('/').get(getProducts).post(protect, admin, createProduct );
router.get('/top', getTopProducts);
router.route('/:id/position').put(protect, admin, checkObjectId, updateProductPosition);
router.route('/:id').get(checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProduct ).delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.route('/:id/reviews/:reviewId').put(protect, checkObjectId, updateProductReview).delete(protect, checkObjectId, deleteProductReview);

export default router;