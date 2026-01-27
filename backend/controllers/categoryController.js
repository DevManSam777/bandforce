import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  let categories = await Category.find({}).sort({ position: 1, name: 1 });
  
  // Initialize positions if they don't exist or are all the same
  const uniquePositions = new Set(categories.map(c => c.position));
  if (uniquePositions.size <= 1) {
    // Assign unique positions
    await Promise.all(categories.map((cat, index) => {
      cat.position = index;
      return cat.save();
    }));
    categories = await Category.find({}).sort({ position: 1, name: 1 });
  }
  
  res.json(categories);
});

// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Category name is required');
  }

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = new Category({ name, description });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, position } = req.body;
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  // Check if new name already exists (and it's not the same category)
  if (name && name !== category.name) {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400);
      throw new Error('Category name already exists');
    }
  }

  category.name = name || category.name;
  category.description = description !== undefined ? description : category.description;
  if (position !== undefined) category.position = position;
  category.slug = undefined; // Force regeneration of slug

  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

// @desc    Update category position
// @route   PUT /api/categories/:id/position
// @access  Private/Admin
const updateCategoryPosition = asyncHandler(async (req, res) => {
  const { direction } = req.body; // 'up' or 'down'
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const allCategories = await Category.find({}).sort({ position: 1 });
  const currentIndex = allCategories.findIndex((c) => c._id.toString() === req.params.id);

  if (direction === 'up' && currentIndex > 0) {
    const previousCategory = allCategories[currentIndex - 1];
    [category.position, previousCategory.position] = [previousCategory.position, category.position];
    await category.save();
    await previousCategory.save();
  } else if (direction === 'down' && currentIndex < allCategories.length - 1) {
    const nextCategory = allCategories[currentIndex + 1];
    [category.position, nextCategory.position] = [nextCategory.position, category.position];
    await category.save();
    await nextCategory.save();
  }

  res.json(category);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  // Find all products with this category
  const productsWithCategory = await Product.find({ category: req.params.id });

  // Remove category from all products (set to null)
  if (productsWithCategory.length > 0) {
    await Product.updateMany(
      { category: req.params.id },
      { $set: { category: null } }
    );
  }

  await Category.deleteOne({ _id: req.params.id });
  res.json({ 
    message: 'Category removed',
    productsUpdated: productsWithCategory.length
  });
});

export { getCategories, getCategoryById, createCategory, updateCategory, updateCategoryPosition, deleteCategory };
