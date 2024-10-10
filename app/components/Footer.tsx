import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white py-8">
      <div className="max-w-[1725px] mx-auto px-4 max-md:px-5">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">SSG Task Manager</h2>
          <p className="mt-2 text-center">
            Empowering the Supreme Student Government with effective task
            management solutions.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-neutral-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} SSG Task Manager. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
