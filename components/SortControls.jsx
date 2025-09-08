import React from 'react';

const SortControls = ({
  sortConfig,
  onSortChange,
  searchQuery,
  onSearchChange,
  numSelected,
  onSelectAll,
  isAllSelected,
  onBulkDelete
}) => {
  const handleKeyChange = (e) => {
    onSortChange({ key: e.target.value });
  };

  const toggleDirection = () => {
    onSortChange({ direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' });
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="w-full md:w-auto flex-grow flex items-center gap-4">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          onChange={onSelectAll}
          checked={isAllSelected}
          aria-label="Select all students"
        />
        {numSelected > 0 ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{numSelected} selected</span>
            <button 
              onClick={onBulkDelete}
              className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Selected
            </button>
          </div>
        ) : (
          <div className="relative w-full md:w-64">
             <input
              type="search"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label="Search students"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Sort by:</label>
        <select
          id="sort-by"
          value={sortConfig.key}
          onChange={handleKeyChange}
          className="block w-32 pl-3 pr-8 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          aria-label="Sort by category"
        >
          <option value="name">Name</option>
          <option value="course">Course</option>
        </select>
        <button
          onClick={toggleDirection}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          aria-label={`Sort ${sortConfig.direction === 'ascending' ? 'descending' : 'ascending'}`}
        >
          {sortConfig.direction === 'ascending' ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SortControls;
