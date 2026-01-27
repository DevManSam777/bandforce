import asyncHandler from '../middleware/asyncHandler.js';
import TaxRate from '../models/taxRateModel.js';

// @desc    Get all tax rates
// @route   GET /api/tax-rates
// @access  Public
const getTaxRates = asyncHandler(async (req, res) => {
  const taxRates = await TaxRate.find({ isActive: true }).sort({ state: 1 });
  res.json(taxRates);
});

// @desc    Get tax rate for a specific state
// @route   GET /api/tax-rates/:state
// @access  Public
const getTaxRateByState = asyncHandler(async (req, res) => {
  const state = req.params.state.toUpperCase();
  const taxRate = await TaxRate.findOne({ state, isActive: true });
  
  if (taxRate) {
    res.json(taxRate);
  } else {
    // Return 0% as fallback if state not found
    res.json({ state, rate: 0, stateName: 'Unknown' });
  }
});

// @desc    Update tax rate for a state
// @route   PUT /api/tax-rates/:state
// @access  Private/Admin
const updateTaxRate = asyncHandler(async (req, res) => {
  const state = req.params.state.toUpperCase();
  const { rate } = req.body;

  if (rate === undefined || rate < 0 || rate > 1) {
    res.status(400);
    throw new Error('Tax rate must be between 0 and 1');
  }

  let taxRate = await TaxRate.findOne({ state });

  if (!taxRate) {
    res.status(404);
    throw new Error(`Tax rate for state ${state} not found`);
  }

  taxRate.rate = rate;
  const updatedTaxRate = await taxRate.save();
  res.json(updatedTaxRate);
});

// @desc    Deactivate tax rate for a state
// @route   PUT /api/tax-rates/:state/deactivate
// @access  Private/Admin
const deactivateTaxRate = asyncHandler(async (req, res) => {
  const state = req.params.state.toUpperCase();

  let taxRate = await TaxRate.findOne({ state });

  if (!taxRate) {
    res.status(404);
    throw new Error(`Tax rate for state ${state} not found`);
  }

  taxRate.isActive = false;
  const updatedTaxRate = await taxRate.save();
  res.json(updatedTaxRate);
});

// @desc    Activate tax rate for a state
// @route   PUT /api/tax-rates/:state/activate
// @access  Private/Admin
const activateTaxRate = asyncHandler(async (req, res) => {
  const state = req.params.state.toUpperCase();

  let taxRate = await TaxRate.findOne({ state });

  if (!taxRate) {
    res.status(404);
    throw new Error(`Tax rate for state ${state} not found`);
  }

  taxRate.isActive = true;
  const updatedTaxRate = await taxRate.save();
  res.json(updatedTaxRate);
});

// @desc    Get all tax rates including inactive (admin view)
// @route   GET /api/tax-rates/admin/all
// @access  Private/Admin
const getAllTaxRates = asyncHandler(async (req, res) => {
  const taxRates = await TaxRate.find({}).sort({ state: 1 });
  res.json(taxRates);
});

export {
  getTaxRates,
  getTaxRateByState,
  updateTaxRate,
  deactivateTaxRate,
  activateTaxRate,
  getAllTaxRates,
};
