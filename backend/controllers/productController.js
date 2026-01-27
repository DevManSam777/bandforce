import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const count = await Product.countDocuments({...keyword});

  let products = await Product.find({...keyword}).populate('category', 'name').sort({ position: 1 }).limit(pageSize).skip(pageSize * (page - 1));
  
  // Initialize positions if they don't exist or are all the same (only on first page)
  if (page === 1) {
    const allProducts = await Product.find({...keyword});
    const uniquePositions = new Set(allProducts.map(p => p.position));
    if (uniquePositions.size <= 1) {
      // Assign unique positions
      await Promise.all(allProducts.map((prod, index) => {
        prod.position = index;
        return prod.save();
      }));
      products = await Product.find({...keyword}).populate('category', 'name').sort({ position: 1 }).limit(pageSize).skip(pageSize * (page - 1));
    }
  }
  
  res.json({products, page, pages: Math.ceil(count / pageSize)});
});


// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if(product){
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Resource not found');
    }
});

// @desc    Create a product
// @route   Post /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: null,
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });
  
  const createdProduct = await product.save();
  const populatedProduct = await Product.findById(createdProduct._id).populate('category', 'name');
  res.status(201).json(populatedProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, images, brand, category, countInStock, featured }= req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.images = images || [];
    product.brand = brand;
    // Only set category if it's a valid ObjectId or empty
    if (category && typeof category === 'string' && category.length > 0) {
      product.category = category;
    } else {
      product.category = null;
    }
    product.countInStock = countInStock;
    product.featured = featured;

    const updatedProduct = await product.save();
    const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name');
    res.json(populatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({_id: product._id});
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Update product position
// @route   PUT /api/products/:id/position
// @access  Private/Admin
const updateProductPosition = asyncHandler(async (req, res) => {
  const { direction } = req.body; // 'up' or 'down'
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const allProducts = await Product.find({}).sort({ position: 1 });
  const currentIndex = allProducts.findIndex((p) => p._id.toString() === req.params.id);

  if (direction === 'up' && currentIndex > 0) {
    const previousProduct = allProducts[currentIndex - 1];
    [product.position, previousProduct.position] = [previousProduct.position, product.position];
    await product.save();
    await previousProduct.save();
  } else if (direction === 'down' && currentIndex < allProducts.length - 1) {
    const nextProduct = allProducts[currentIndex + 1];
    [product.position, nextProduct.position] = [nextProduct.position, product.position];
    await product.save();
    await nextProduct.save();
  }

  res.json(product);
});


// @desc    Create a new  review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview= asyncHandler(async (req, res) => {
  
  const{ rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
    
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = { 
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added'});
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a product review
// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private
const deleteProductReview = asyncHandler(async (req, res) => {
  const { id: productId, reviewId } = req.params;

  const product = await Product.findById(productId);

  if (product) {
    const review = product.reviews.find((r) => r._id.toString() === reviewId);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to delete this review');
    }

    product.reviews = product.reviews.filter((r) => r._id.toString() !== reviewId);
    product.numReviews = product.reviews.length;

    if (product.reviews.length > 0) {
      product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
    } else {
      product.rating = 0;
    }

    await product.save();
    res.json({ message: 'Review deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product review
// @route   PUT /api/products/:id/reviews/:reviewId
// @access  Private
const updateProductReview = asyncHandler(async (req, res) => {
  const { id: productId, reviewId } = req.params;
  const { rating, comment } = req.body;

  const product = await Product.findById(productId);

  if (product) {
    const review = product.reviews.find((r) => r._id.toString() === reviewId);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this review');
    }

    review.rating = Number(rating);
    review.comment = comment;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.json({ message: 'Review updated', review });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  // Try to get featured products first
  let products = await Product.find({ featured: true }).populate('category', 'name');
  
  // If no featured products exist, fall back to top-rated
  if (products.length === 0) {
    products = await Product.find({}).populate('category', 'name').sort({ rating: -1 }).limit(3);
  }
  
  res.status(200).json(products);
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateProductPosition, createProductReview, deleteProductReview, updateProductReview, getTopProducts };