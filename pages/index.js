// pages/index.js
import { useState, useEffect } from "react";
import InputContainer from "../components/InputContainer";
import generateFunny from "../lib/funny";
import generateConstructive from "../lib/constructive";
import "../styles/globals.css";
import ThemeSwitch from "../components/ThemeSwitch";
import CollectArticles from "@/components/CollectArticles";
import ConditionalLink from "@/components/ConditionalLink";
import FooterComponent from "@/components/FooterComponent";
import DropdownMenu from "@/components/DropdownMenu";

export default function Home() {
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <HomeClient />
    </div>
  );
}

function HomeClient() {
  const [tone, setTone] = useState("");
  const [prompt, setPrompt] = useState(generateFunny());
  const [urls, setUrls] = useState(Array(5).fill(""));
  const [output, setOutput] = useState({ text: "", link: null });
  

  const handleToneChange = (selectedOption) => {
    setTone(selectedOption)
  };

  useEffect(() => {
    if (tone == "funny") {
      setPrompt(generateFunny())
    } else if (tone == "constructive") {
      setPrompt(generateConstructive())
    }
  }, [tone, prompt]);


  const handleUrlChange = (index) => (event) => {
    const newUrls = [...urls];
    newUrls[index] = event.target.value;
    setUrls(newUrls);
  };

  const addUrlInput = () => {
    setUrls([...urls, ""]);
  };

  const generateOutput = () => {
    let outputText;
    switch (tone) {
      case "funny":
        outputText = generateFunny();
        break;
      case "constructive":
        outputText = generateConstructive();
        break;
      default:
        outputText = "Please select a tone.";
    }

    outputText += "\nURLs:\n" + urls.join("\n");
    setOutput({ text: outputText, link: outputText });
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto text-center">
      <ThemeSwitch />
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        Nyhedsbrevsgenerator
      </p>
      <DropdownMenu onOptionSelect={handleToneChange} />
      <InputContainer
        handleToneChange={handleToneChange}
        urls={urls}
        handleUrlChange={handleUrlChange}
        addUrlInput={addUrlInput}
      />
      <div className="mt-4">
        <p className="text-gray-600 dark:text-gray-200">{output.text}</p>
        {output.link}
        <CollectArticles urls={urls} prompt={prompt} />
        <ConditionalLink />

      </div>
      <FooterComponent />
    </div>
  );
}
