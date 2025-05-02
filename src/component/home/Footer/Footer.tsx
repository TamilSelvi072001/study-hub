import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fff] text-black text-gray-300 px-8 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-lg text-black font-semibold mb-3 ">
            About FocusHub
          </h4>
          <p className="text-sm text-black">
            FocusHub is your personal productivity partner—offering quiet,
            comfortable spaces for study, work, and creativity across cities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-black">Quick Links</h4>
          <ul className="space-y-2 text-sm text-black">
            <li>
              <a href="#" className="hover:text-blue-400 ">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-black">Contact Us</h4>
          <ul className="text-sm space-y-1 text-black">
            <li>
              Email:{" "}
              <a
                href="mailto:tamilselvi072001@gmail.com"
                className="hover:text-blue-400"
              >
                tamilselvi072001@gmail.com
              </a>
            </li>
            <li>
              Phone: <span>+91 7094559993</span>
            </li>
            <li>Chennai, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-black">Follow Us</h4>
          <div className="flex space-x-4 text-sm text-black">
            <a
              href="https://www.linkedin.com/in/tamil-selvi-g/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} FocusHub. All rights reserved.</p>
        <p className="mt-1">
          Made with 💙 for learners, creators, and professionals.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
