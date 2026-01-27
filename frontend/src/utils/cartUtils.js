export const addDecimals = (num) => {
     return (Math.round(num * 100 ) / 100).toFixed(2);
}

// State tax rates mapping (must match backend)
const STATE_TAX_RATES = {
     AL: 0.04, AK: 0.00, AZ: 0.056, AR: 0.065, CA: 0.0725, CO: 0.029, CT: 0.0635,
     DE: 0.00, FL: 0.06, GA: 0.04, HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07,
     IA: 0.06, KS: 0.057, KY: 0.06, LA: 0.045, ME: 0.055, MD: 0.06, MA: 0.0625,
     MI: 0.06, MN: 0.0685, MS: 0.07, MO: 0.0425, MT: 0.00, NE: 0.055, NV: 0.0685,
     NH: 0.00, NJ: 0.06625, NM: 0.0525, NY: 0.04, NC: 0.045, ND: 0.05, OH: 0.0575,
     OK: 0.045, OR: 0.00, PA: 0.06, RI: 0.07, SC: 0.045, SD: 0.045, TN: 0.0955,
     TX: 0.0625, UT: 0.061, VT: 0.06, VA: 0.0575, WA: 0.065, WV: 0.06, WI: 0.05,
     WY: 0.04, DC: 0.0575
};

export const updateCart = (state) => {
     // Calculate items price
     state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

     // Calculate shipping price (if order is over $100 then free, else $10 shipping)
     state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

     // Calculate tax price (based on state, defaults to CA if no state)
     const state_code = state.shippingAddress?.state || 'CA';
     const taxRate = STATE_TAX_RATES[state_code] || 0;
     state.taxPrice = addDecimals(Number((taxRate * state.itemsPrice).toFixed(2)));

     // Calculate total price
     state.totalPrice = (
         Number(state.itemsPrice) +
         Number(state.shippingPrice) +
         Number(state.taxPrice)).toFixed(2);

         localStorage.setItem('cart', JSON.stringify(state));
         return state;
};