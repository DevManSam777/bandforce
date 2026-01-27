import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import 'dotenv/config';

const fixCategoryData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find all products with invalid category data (strings instead of ObjectIds)
    const products = await Product.find();
    let updated = 0;

    for (const product of products) {
      if (product.category && typeof product.category === 'string') {
        console.log(`Fixing product ${product._id}: category "${product.category}" -> null`);
        product.category = null;
        await product.save();
        updated++;
      }
    }

    console.log(`\nFixed ${updated} products with invalid category data`);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing category data:', error);
    process.exit(1);
  }
};

fixCategoryData();
