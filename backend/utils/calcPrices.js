import TaxRate from '../models/taxRateModel.js';

function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  // Fallback rates in case database is unavailable
  const FALLBACK_RATES = {
    AL: 0.04, AK: 0.00, AZ: 0.056, AR: 0.065, CA: 0.0725, CO: 0.029, CT: 0.0635,
    DE: 0.00, FL: 0.06, GA: 0.04, HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07,
    IA: 0.06, KS: 0.057, KY: 0.06, LA: 0.045, ME: 0.055, MD: 0.06, MA: 0.0625,
    MI: 0.06, MN: 0.0685, MS: 0.07, MO: 0.0425, MT: 0.00, NE: 0.055, NV: 0.0685,
    NH: 0.00, NJ: 0.06625, NM: 0.0525, NY: 0.04, NC: 0.045, ND: 0.05, OH: 0.0575,
    OK: 0.045, OR: 0.00, PA: 0.06, RI: 0.07, SC: 0.045, SD: 0.045, TN: 0.0955,
    TX: 0.0625, UT: 0.061, VT: 0.06, VA: 0.0575, WA: 0.065, WV: 0.06, WI: 0.05,
    WY: 0.04, DC: 0.0575
  };

  // Get tax rate from database or fallback
  export async function getTaxRate(state) {
    try {
      const taxRate = await TaxRate.findOne({ state, isActive: true });
      if (taxRate) {
        return taxRate.rate;
      }
    } catch (error) {
      console.warn('Error fetching tax rate from DB, using fallback:', error.message);
    }
    // Use fallback rate if DB query fails or rate not found
    return FALLBACK_RATES[state] || 0;
  }
  
  export async function calcPrices(orderItems, state = 'CA') {
    // Calculate the items price
    const itemsPrice = addDecimals(
      orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    // Calculate the shipping price
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
    
    // Get tax rate from database
    const taxRate = await getTaxRate(state);
    
    // Calculate the tax price
    const taxPrice = addDecimals(Number((taxRate * itemsPrice).toFixed(2)));
    
    // Calculate the total price
    const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);
    
    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  };