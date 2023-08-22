import React from 'react';

    const CopyToClipboardButton = ({ data }) => {
        // Function to copy the text
        const handleCopy = () => {
          navigator.clipboard.writeText(data);
        };
      
        // Render the button
        return (
          <button onClick={handleCopy} className="px-4 py-2 font-semibold leading-6 shadow rounded text-white bg-rd-purple hover:bg-indigo-400 transition ease-in-out duration-150">
            Copy to Clipboard
          </button>
        );
      };
      
      export default CopyToClipboardButton;
