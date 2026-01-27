import mongoose from 'mongoose';

const taxRateSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      enum: [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
      ],
    },
    stateName: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const TaxRate = mongoose.model('TaxRate', taxRateSchema);
export default TaxRate;
