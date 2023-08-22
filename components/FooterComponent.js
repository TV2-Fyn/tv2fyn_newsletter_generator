import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full mt-[10rem] py-3 p-8 drop-shadow-lg text-center bg-rd-gray rounded  dark:bg-rd-black text-white bottom-0">
            <div className="container mx-auto">
                <span className="text-gray-300 text-xs">Bygget i react, next og tailwind. Bruger OpenAI API, cheerio og vercel. <br></br>Bygget af Martin Dreyer og Louise Koustrup</span>
                <div className="flex justify-center py-3">
                    <img src="https://rd.tv2fyn.dk/wp-content/uploads/2023/03/rubberduck_loko.svg" alt="Logo 1" className="w-24 h-24 mx-2"/>
                    <img src="https://rd.tv2fyn.dk/wp-content/uploads/2023/07/TV2Fyn_Secondary_White_Rgb_20230307.svg" alt="Logo 2" className="w-24 h-24 mx-2"/>
                </div>
            </div>
        </footer>
    );
}
