"use client";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-extrabold text-pink-400 mb-4">ExSeas</h2>
          <p className="text-gray-400">
            Swap stablecoin ke rupiah langsung ke rekening. Simpel, cepat, dan
            aman.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg font-bold text-purple-400 mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/demo" className="hover:text-white transition">
                Demo
              </a>
            </li>
            <li>
              <a href="/docs" className="hover:text-white transition">
                Docs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold text-purple-400 mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Tutorials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-bold text-purple-400 mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Partners
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-700">
        <p>© {new Date().getFullYear()} ExSeas. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-200">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
