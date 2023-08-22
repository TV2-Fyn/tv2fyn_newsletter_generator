// components/UrlInput.js
import React from 'react';

const UrlInput = ({ value, onChange, placeholder }) => (
  <input 
    type="url" 
    className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded focus:outline-none focus:shadow-outline" 
    placeholder={placeholder}
    value={value} 
    onChange={onChange} 
  />
);

export default UrlInput;
