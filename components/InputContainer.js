// components/InputContainer.js
import React from 'react';
import ToneSelect from './ToneSelect';
import UrlInput from './UrlInput';

const InputContainer = ({ urls, handleUrlChange, addUrlInput, handleToneChange }) => {
    return (
      <div className="mt-4">
      {urls.map((url, index) => (
        <UrlInput 
          key={index} 
          value={url} 
          onChange={handleUrlChange(index)} 
          placeholder={`URL ${index + 1}`} 
        />
      ))}
      <button 
        className="justify-center mt-2 px-3 py-2 font-semibold text-white bg-rd-purple hover:bg-indigo-700 dark:bg-rd-purple dark:hover:bg-indigo-800 rounded"
        onClick={addUrlInput}
      >
        Tilføj link
      </button>
      {/* Future inputs go here */}
    </div>
  );
};

export default InputContainer;
