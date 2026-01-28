import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import 'dotenv/config';

const fakeReviews = [
  { name: 'John D.', rating: 5, comment: 'Great quality! These bands are perfect for my home gym. Highly recommend!' },
  { name: 'Sarah M.', rating: 5, comment: 'Love the durability. I\'ve been using these for 3 months and they\'re holding up great.' },
  { name: 'Mike T.', rating: 4, comment: 'Good product. Shipping was fast. Would be 5 stars but packaging could be better.' },
  { name: 'Emma L.', rating: 5, comment: 'Amazing value for the price. Best resistance bands I\'ve used!' },
  { name: 'James P.', rating: 4, comment: 'Works as described. Very satisfied with this purchase.' },
  { name: 'Lisa R.', rating: 5, comment: 'Perfect for beginners and experienced users alike. Can\'t ask for more.' },
  { name: 'David K.', rating: 4, comment: 'Good quality. Took a while to get here but happy with the product.' },
  { name: 'Rachel G.', rating: 5, comment: 'Best investment for my fitness routine. Customer service was super helpful!' },
  { name: 'Tom S.', rating: 5, comment: 'Exceeded my expectations. The resistance is exactly what I needed.' },
  { name: 'Amanda B.', rating: 4, comment: 'Very satisfied. Will definitely order again next month.' },
  { name: 'Chris N.', rating: 5, comment: 'Outstanding quality and fast delivery. Highly recommend to everyone!' },
  { name: 'Jennifer W.', rating: 5, comment: 'Love these bands. My whole family is using them now!' },
  { name: 'Mark H.', rating: 4, comment: 'Great product. Minor issue with one band but customer support fixed it immediately.' },
  { name: 'Nicole J.', rating: 5, comment: 'Perfect for my post-pregnancy fitness journey. So grateful I found this.' },
  { name: 'Ryan C.', rating: 5, comment: 'Best purchase I\'ve made all year. Quality is unmatched.' },
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedReviews = async () => {
  try {
    const products = await Product.find().limit(5);
    const users = await User.find().limit(10);

    if (!products.length || !users.length) {
      console.log('Not enough products or users to seed reviews');
      process.exit(1);
    }

    let reviewCount = 0;

    for (const product of products) {
      const productReviewCount = Math.floor(Math.random() * 4) + 2; // 2-5 reviews per product

      for (let i = 0; i < productReviewCount; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomReview = fakeReviews[Math.floor(Math.random() * fakeReviews.length)];
        
        // Add review to product
        product.reviews.push({
          user: randomUser._id,
          name: randomUser.name,
          rating: randomReview.rating,
          comment: randomReview.comment,
        });

        reviewCount++;
      }

      // Recalculate rating and numReviews
      const ratings = product.reviews.map(r => r.rating);
      product.rating = ratings.length > 0 
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : 0;
      product.numReviews = product.reviews.length;

      await product.save();
    }

    console.log(`✓ Added ${reviewCount} fake reviews to ${products.length} products`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding reviews:', error);
    process.exit(1);
  }
};

connectDB().then(() => seedReviews());
