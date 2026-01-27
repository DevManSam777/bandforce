const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-6 sm:px-8 py-8 sm:py-12">
        {/* Footer Content - 2 cols on mobile, 4 cols on sm and up */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-12 mb-8">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-1 sm:flex-shrink-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2">ProShop</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xs">
              Your trusted destination for quality products and exceptional service.
            </p>
          </div>

          {/* Shop Links */}
          <div className="sm:flex-shrink-0">
            <h4 className="font-semibold text-gray-900 mb-3 text-xs sm:text-sm">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">Home</a></li>
              <li><a href="/about" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">About</a></li>
              <li><a href="/cart" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">Cart</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="sm:flex-shrink-0">
            <h4 className="font-semibold text-gray-900 mb-3 text-xs sm:text-sm">Support</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">FAQs</a></li>
              <li><a href="/shipping-info" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">Shipping</a></li>
              <li><a href="mailto:support@proshop.com" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-2 sm:col-span-auto sm:flex-shrink-0">
            <h4 className="font-semibold text-gray-900 mb-3 text-xs sm:text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">Privacy</a></li>
              <li><a href="/terms" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">Terms</a></li>
              <li><a href="/login" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition">Sign In</a></li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            &copy; {currentYear} ProShop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
