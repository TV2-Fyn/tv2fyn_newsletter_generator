// components/ThemeSwitch.js
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mb-6">
      <input 
        type="checkbox"
        name="toggle"
        id="toggle"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-rd-purple border-2 border-rd-green-gray appearance-none cursor-pointer"
        checked={theme === 'dark'}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
      <label 
        htmlFor="toggle"
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
      >
      </label>
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          background-color: rd-purple;
        }
      `}</style>
    </div>
  )
}
