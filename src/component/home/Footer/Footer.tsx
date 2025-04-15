import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#0c2045] text-white p-8 mt-8 bottom-0">
      <div className="max-w-7xl mx-auto ">
        <div>
          <a
            href="mailto:tamilselvi072001@gmail.com"
            className="hover:text-[#cbd5e1]"
          >
            tamilselvi072001@gmail.com
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/tamil-selvi-g/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#cbd5e1]"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-sm">
          <p>
            FocusHub - A quiet space for learning, creativity, and productivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
