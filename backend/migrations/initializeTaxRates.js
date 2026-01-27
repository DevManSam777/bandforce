import mongoose from 'mongoose';
import TaxRate from '../models/taxRateModel.js';
import 'dotenv/config';

const TAX_RATES_DATA = [
  { state: 'AL', stateName: 'Alabama', rate: 0.04 },
  { state: 'AK', stateName: 'Alaska', rate: 0.00 },
  { state: 'AZ', stateName: 'Arizona', rate: 0.056 },
  { state: 'AR', stateName: 'Arkansas', rate: 0.065 },
  { state: 'CA', stateName: 'California', rate: 0.0725 },
  { state: 'CO', stateName: 'Colorado', rate: 0.029 },
  { state: 'CT', stateName: 'Connecticut', rate: 0.0635 },
  { state: 'DE', stateName: 'Delaware', rate: 0.00 },
  { state: 'FL', stateName: 'Florida', rate: 0.06 },
  { state: 'GA', stateName: 'Georgia', rate: 0.04 },
  { state: 'HI', stateName: 'Hawaii', rate: 0.04 },
  { state: 'ID', stateName: 'Idaho', rate: 0.06 },
  { state: 'IL', stateName: 'Illinois', rate: 0.0625 },
  { state: 'IN', stateName: 'Indiana', rate: 0.07 },
  { state: 'IA', stateName: 'Iowa', rate: 0.06 },
  { state: 'KS', stateName: 'Kansas', rate: 0.057 },
  { state: 'KY', stateName: 'Kentucky', rate: 0.06 },
  { state: 'LA', stateName: 'Louisiana', rate: 0.045 },
  { state: 'ME', stateName: 'Maine', rate: 0.055 },
  { state: 'MD', stateName: 'Maryland', rate: 0.06 },
  { state: 'MA', stateName: 'Massachusetts', rate: 0.0625 },
  { state: 'MI', stateName: 'Michigan', rate: 0.06 },
  { state: 'MN', stateName: 'Minnesota', rate: 0.0685 },
  { state: 'MS', stateName: 'Mississippi', rate: 0.07 },
  { state: 'MO', stateName: 'Missouri', rate: 0.0425 },
  { state: 'MT', stateName: 'Montana', rate: 0.00 },
  { state: 'NE', stateName: 'Nebraska', rate: 0.055 },
  { state: 'NV', stateName: 'Nevada', rate: 0.0685 },
  { state: 'NH', stateName: 'New Hampshire', rate: 0.00 },
  { state: 'NJ', stateName: 'New Jersey', rate: 0.06625 },
  { state: 'NM', stateName: 'New Mexico', rate: 0.0525 },
  { state: 'NY', stateName: 'New York', rate: 0.04 },
  { state: 'NC', stateName: 'North Carolina', rate: 0.045 },
  { state: 'ND', stateName: 'North Dakota', rate: 0.05 },
  { state: 'OH', stateName: 'Ohio', rate: 0.0575 },
  { state: 'OK', stateName: 'Oklahoma', rate: 0.045 },
  { state: 'OR', stateName: 'Oregon', rate: 0.00 },
  { state: 'PA', stateName: 'Pennsylvania', rate: 0.06 },
  { state: 'RI', stateName: 'Rhode Island', rate: 0.07 },
  { state: 'SC', stateName: 'South Carolina', rate: 0.045 },
  { state: 'SD', stateName: 'South Dakota', rate: 0.045 },
  { state: 'TN', stateName: 'Tennessee', rate: 0.0955 },
  { state: 'TX', stateName: 'Texas', rate: 0.0625 },
  { state: 'UT', stateName: 'Utah', rate: 0.061 },
  { state: 'VT', stateName: 'Vermont', rate: 0.06 },
  { state: 'VA', stateName: 'Virginia', rate: 0.0575 },
  { state: 'WA', stateName: 'Washington', rate: 0.065 },
  { state: 'WV', stateName: 'West Virginia', rate: 0.06 },
  { state: 'WI', stateName: 'Wisconsin', rate: 0.05 },
  { state: 'WY', stateName: 'Wyoming', rate: 0.04 },
  { state: 'DC', stateName: 'District of Columbia', rate: 0.0575 },
];

const initializeTaxRates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if tax rates already exist
    const existingCount = await TaxRate.countDocuments();
    if (existingCount > 0) {
      console.log(`Tax rates already initialized (${existingCount} rates found). Skipping...`);
      process.exit(0);
    }

    // Insert tax rates
    const result = await TaxRate.insertMany(TAX_RATES_DATA);
    console.log(`Successfully initialized ${result.length} tax rates`);
    process.exit(0);
  } catch (error) {
    console.error('Error initializing tax rates:', error.message);
    process.exit(1);
  }
};

initializeTaxRates();
