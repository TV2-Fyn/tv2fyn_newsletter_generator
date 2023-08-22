import { useState } from "react";
import * as cheerio from "cheerio";

const CollectArticles = ({ urls, prompt }) => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedNewsletters, setSavedNewsletters] = useState([]);
  const articles = [];

  const handleSaveNewsletter = () => {
    if (!savedNewsletters.includes(result)) {
      setSavedNewsletters((prevList) => [...prevList, result]);
    }
  };

  const handleClearHistoy = () => {
    setSavedNewsletters([]);
  };

  // Loop through the urls, scrape the articles, get the newsletter.
  const handleFetchArticles = async () => {
    setIsLoading(true);
    setResult("");
    try {
      // Loop through the urls
      for (const el of urls) {
        if (el.length > 0) {
          // Get urls if they exist
          const res = await fetch(el);
          if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
          }
          const data = await res.text();
          // Extract content to articles list
          articles.push(scrapeArticles(data, el));
        }
      }
    } catch (error) {
      console.error(error);
    }
    if (articles.length > 0) {
      // If there are articles in the list, use them to get the newsletter from the Open AI API
      generateNewsletter(articles);
    } else {
      setIsLoading(false);
    }
  };

  // Function to scrape articles from tv2fyn.dk
  const scrapeArticles = (data, element) => {
    // Load the data to a cheerio object
    const $ = cheerio.load(data);

    // Find the path of the url - it is used to check the ID of blog-articles
    const regex = /https:\/\/www\.tv2fyn\.dk(.+)/;
    const id = element.match(regex);

    // Extract blogarticle (if it exists)
    const blogHeading = $(`div[id="${id[1]}"] .title`).text();
    const blogBody = $(`div[id="${id[1]}"] .text-component`).text();

    // Push article to list if it exists as a blog article
    if (blogHeading && blogBody) {
      const obj = {
        headline: blogHeading.trim(),
        subheading: "",
        body: blogBody.trim(),
        link: element,
      };
      return obj;
    }

    // Push article to list if it exists as a video article
    const videoHeading = $(".header-wide-video .title.heading__heading").text();
    const videoSynopsis = $(
      ".header-wide-video .text.heading__synopsis"
    ).text();

    if (videoHeading && videoSynopsis) {
      const obj = {
        headline: videoHeading.trim(),
        subheading: "",
        body: videoSynopsis.trim(),
        link: element,
      };
      return obj;
    }

    // Extract article (if it exits)
    const heading = $(".heading-component .title").text();
    const subheading = $(".heading-component .text").text();
    const body = $(".article__body p").text();

    // Push article to list if it exist as a normal article
    if (heading && subheading && body) {
      const obj = {
        headline: heading.trim(),
        subheading: subheading.trim(),
        body: body.trim(),
        link: element,
      };
      return obj;
    }
  };

  // TODO - Set conditional - if articles are more than a certain length, get recaps before getting newsletter
  // const handleGetRecaps = async (articles) => {
  //   let resultString = "";
  //   try {
  //     for (const el in articles) {
  //       const options = {
  //         method: "POST",
  //         body: JSON.stringify({
  //           messages: [
  //             {
  //               role: "system",
  //               content:
  //                 "Du skriver præcise resuméer af nyhedshistorier på maksimalt 100 ord",
  //             },
  //             {
  //               role: "user",
  //               content: `Skriv et resumé på dansk af følgende artikel - bevar linksne til hver artikel: Overskrift:\n ${articles[el].headline},\n\n undertitel:\n ${articles[el].subheading},\n\n brødtekst: \n ${articles[el].body}, \n\n link: \n ${articles[el].link}`,
  //             },
  //           ],
  //         }),
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       };

  //       const response = await fetch("/api/generate", options);
  //       const data = await response.json();
  //       resultString +=
  //         "Resumé: " + JSON.stringify(data.choices[0].message.content) + "\n";
  //     }
  //     return resultString;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const generateNewsletter = async (articles) => {
    let resultString = "";
    // TODO - Set conditional - if articles are more than a certain length, get recaps before getting newsletter
    // let recaps = "";
    const delayLoop = async () => {
      for (const el in articles) {
        await new Promise((resolve) => {
          setTimeout(async () => {
            // recaps += await getRecaps(articles);
            resultString += `<article><headline>\n ${articles[el]?.headline}</headline><subheading>${articles[el]?.subheading}</subheading><body>${articles[el]?.body}</body><link>${articles[el]?.link}</link></article>`;

            resolve();
          }, 300);
        });
      }
    };
    delayLoop()
      .then(async () => {
        const options = {
          method: "POST",
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: prompt,
              },
              {
                role: "user",
                content: `${resultString}`,
              },
            ],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const response = await fetch("/api/generate", options);
          if (!response.ok) {
            window.alert("Der skete en fejl");
            setIsLoading(false);
            throw new Error("Failed to fetch");
          }
          const data = await response.json();
          setResult(data.choices[0].message.content);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <button
          className="px-4 py-2 inline-flex font-semibold leading-6 shadow rounded text-white bg-rd-purple hover:bg-indigo-400 transition ease-in-out duration-150  cursor-not-allowed"
          type="button"
        >
          <div className="pr-2">
            <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="rd-purple"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          Arbejder...
        </button>
      ) : (
        <button
          className="px-4 py-2 font-semibold leading-6 shadow rounded text-white bg-rd-purple hover:bg-indigo-400 transition ease-in-out duration-150 "
          onClick={handleFetchArticles}
          type="button"
        >
          Generér nyhedsbrev
        </button>
      )}
      {result.length > 0 && (
        <>
          <div className="w-full whitespace-pre-wrap text-left mt-4">
            <p>{result}</p>
          </div>
          <button
            className="px-4 py-2 font-semibold leading-6 shadow rounded text-white bg-rd-purple hover:bg-indigo-400 transition ease-in-out duration-150"
            onClick={handleSaveNewsletter}
          >
            Gem nyhedsbrev
          </button>
        </>
      )}
      {savedNewsletters.length > 0 && (
        <div>
          <button
            className="px-4 py-2 mt-5 font-semibold leading-6 shadow rounded text-white bg-rd-purple hover:bg-indigo-400 transition ease-in-out duration-150"
            onClick={handleClearHistoy}
          >
            Ryd historik
          </button>
          <p className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">Gemte Nyhedsbreve</p>
          <div className="w-full whitespace-pre-wrap text-left mt-4">
          {savedNewsletters.map((str, index) => (
            <li className="list-none" key={index}>{str}</li>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default CollectArticles;
