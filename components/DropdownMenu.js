import React, { useState } from 'react';

const DropdownMenu = ({onOptionSelect}) => {
  const [selectedOption, setSelectedOption] = useState(''); // State to keep track of the selected option

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onOptionSelect(selectedValue);
  };

  return (
    <div>
      <select id="dropdown" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" value={selectedOption} onChange={handleOptionChange}>
        <option value="">--Vælg en tone--</option>
        <option value="funny">Sjov veninde</option>
        <option value="constructive">Konstruktiv person</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
