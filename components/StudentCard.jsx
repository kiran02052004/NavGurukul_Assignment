import React from 'react';

const StudentCard = ({ student, courseName, onEdit, onDelete, isSelected, onToggleSelection }) => {
  const handleCardClick = (e) => {
    // Allow clicking on buttons without toggling selection
    if (e.target.closest('button')) {
      return;
    }
    onToggleSelection(student.studentId);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      role="listitem"
      aria-selected={isSelected}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={isSelected}
              onChange={() => onToggleSelection(student.studentId)}
              aria-label={`Select student ${student.name}`}
            />
          </div>
          <img
            className="h-20 w-20 rounded-full object-cover"
            src={student.imageUrl}
            alt={`${student.name}'s profile`}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{student.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{student.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">ID: {student.studentId}</p>
              </div>
              <div className="flex items-center flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(student);
                  }}
                  className="text-gray-400 hover:text-blue-500 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Edit ${student.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(student);
                  }}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-full ml-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Delete ${student.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {courseName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance optimization with React.memo
export default React.memo(StudentCard);
