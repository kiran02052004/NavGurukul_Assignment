import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "../assets/logo.jpg"; // Ensure this path is correct

const Header = ({ onAddStudent, onShowCourses, theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Logo + Title */}
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
          <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full shadow-md">
  <img
    src={Logo}
    alt="Logo"
    className="h-16 w-16 object-contain"
  />
</div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white ml-3 text-center sm:text-left">
            Student Management Dashboard
          </h1>
        </div>

        {/* Theme Toggle + Add Student Button */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={onAddStudent}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md 
                       transition-transform transform hover:scale-105 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add Student</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-4 top-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 w-48 z-50">
            <button
              onClick={() => {
                setMenuOpen(false);
                onAddStudent();
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Add Student
            </button>
            <button
      onClick={() => {
        setMenuOpen(false);
        onShowCourses();
      }}
      className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      View Courses
    </button>
  </div>
          
        )}
      </div>
    </header>
  );
};

export default Header;
