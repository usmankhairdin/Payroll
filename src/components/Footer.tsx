import React, { useContext } from 'react';
import { AuthContext } from '../App';

const Footer = () => {
  const { setCurrentView } = useContext(AuthContext);
  return (
    <footer className="fixed bottom-0 left-0 lg:left-64 right-0 w-auto bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 shadow-2xl border-t border-slate-700/50 backdrop-blur-sm py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-300 z-40">
      <span>© {new Date().getFullYear()} PayrollPro. All rights reserved.</span>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <button onClick={() => setCurrentView('privacy')} className="hover:text-blue-300 transition-colors underline outline-none bg-transparent border-0 cursor-pointer p-0">Privacy Policy</button>
        <span className="text-slate-400">|</span>
        <button onClick={() => setCurrentView('terms')} className="hover:text-blue-300 transition-colors underline outline-none bg-transparent border-0 cursor-pointer p-0">Terms of Service</button>
      </div>
    </footer>
  );
};

export default Footer;
