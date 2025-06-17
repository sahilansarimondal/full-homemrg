import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-bar-container">
      <h3>Filter By</h3>
      {/* Example checkboxes - customize as needed */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.includes('category1')}
            onChange={() => onFilterChange('category1')}
          />
          Category 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.includes('category2')}
            onChange={() => onFilterChange('category2')}
          />
          Category 2
        </label>
      </div>
    </div>
  );
};

export default FilterBar;
