const ToneSelect = ({ handleToneChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="tone"
        className="mt-8 block text-sm text-left font-medium text-gray-700 dark:text-white"
      ></label>
      <select
        id="tone"
        name="tone"
        onChange={handleToneChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
      >
        <option value="funny">Sjov veninde</option>
        <option value="constructive">Konstruktiv person</option>
      </select>
    </div>
  );
};

export default ToneSelect;
