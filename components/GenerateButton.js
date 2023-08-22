// components/GenerateButton.js
import React from 'react';

const GenerateButton = ({ generateOutput }) => (
  <button 
    className="mt-4 px-4 py-2 font-semibold text-white bg-indigo-500 hover:bg-indigo-700 rounded"
    onClick={generateOutput}
  >
    Generate
  </button>
);

export default GenerateButton;
