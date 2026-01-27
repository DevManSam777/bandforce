import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const Step = ({ number, label, active, link }) => {
    if (active) {
      return (
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <Link
            to={link}
            className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-base hover:bg-cyan-700 transition"
          >
            {number}
          </Link>
          <span className="text-xs md:text-sm font-semibold text-cyan-600">{label}</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-base cursor-not-allowed">
          {number}
        </div>
        <span className="text-xs md:text-sm font-semibold text-gray-600">{label}</span>
      </div>
    );
  };

  return (
    <nav className="flex justify-center items-flex-start gap-3 sm:gap-6 md:gap-12 mb-8 py-6 px-2 sm:px-4">
      <Step number="1" label="Sign In" active={step1} link="/login" />
      <Step number="2" label="Shipping" active={step2} link="/shipping" />
      <Step number="3" label="Payment" active={step3} link="/payment" />
      <Step number="4" label="Place Order" active={step4} link="/placeorder" />
    </nav>
  );
};

export default CheckoutSteps;
