import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {
    {/* step3 */ }
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };
    {/* step2 */ }
    return (
        <input
            type="search"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4"
        />
    )
}

export default LocalSearch;
