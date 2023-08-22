// pages/index.client.js
import { useState } from 'react';
import ToneSelect from '../components/ToneSelect';
import ThemeSwitch from '../components/ThemeSwitch';

export default function HomeClient() {
  const [tone, setTone] = useState("");

  const handleToneChange = ({ value }) => {
    setTone(value);
  };

  return (
    <div className="container mx-auto px-4">
      <ThemeSwitch />
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Newsletter Generator</h1>
      
      <ToneSelect handleToneChange={handleToneChange} />
      <p className="mt-4">Selected Tone: {tone}</p>
    </div>
  )
}
