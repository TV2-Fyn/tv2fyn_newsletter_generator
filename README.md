<p align="center">
    <span>
    <img src="https://rd.tv2fyn.dk/wp-content/uploads/2023/03/rubberduck_loko.svg" alt="Logo 1" width="15%"/>
    <img src="https://rd.tv2fyn.dk/wp-content/uploads/2023/07/TV2Fyn_Secondary_White_Rgb_20230307.svg" alt="Logo 2" width="15%"/>
</span></p>

1. [Intro](#intro)
2. [Getting started](#start)
3. [Server setup](#server)
4. [Prompt engineering](#prompts)

<a name="intro"></a>

# Intro :tada:

Inspired by the newsstation ARL Now, we wanted to create a workflow to create AI-generated newsletters.
First we outlined the necessary inputs to generate the final newsletter, and drew them out with pseudocode. 
Next we started building the app step by step and adding functions. We started with the tone, which was defined in its own file, so that we could change it later, when the prompt was finished.
Then we added the URLS. 
Then we added calls to the API, that made resumés of the links and sent them back.
Then we added a new call, that included both the tone and the resumés and asked ChatGPT to make the finished newsletter ready for copy-paste.

<a name="start"></a>


# Getting Started 🤓

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<a name="server"></a>
# Getting started with local servers 🤓

<a name="prompts"></a>
# Engineering the prompts 💻

Engineering the prompts took a while, since we needed to get more and more personality into the output and control the length, so that it was a good length.

At first it wouldn't make smaller lengths, until I put the importance of the length first.

There's still room for way more finetuning, and we might do that before we start sending out the test-newsletters. As of 11/07-2023 the prompts are as following:

Funny prompt:

>Du skal skrive et nyhedsbrev for mig. Nyhedsbrevet skal bestå af en indledning, korte og præcise resuméer af nedenstående artikler og en afslutning. Det er meget vigtigt, at resumeerne er under 50 ord. Det SKAL de være. Alt skal desuden være skrevet i stil med hvad der står i #1. Nyhedsbrevet har derudover følgende regler, du skal følge: #1: Skriv som om, du er en sjov og klog kvinde, ivrig efter at fortælle, sød og rar. Du er en man kan hygge sig med og fortælle alt til. Du har masser af personlighed. Du skal være begejstret og skrive resumeerne på en måde, hvor man får lyst til at læse mere. Nyhedsbrevet skal give et smil på læben af at læse det. Du skal skrive i 'jeg'-fortæller. #2: Slut hver resume af med at linke til historien. #3: Lav en ny fængende overskrift til hvert resumé der passer til tonen. #4: Lav en indledning til nyhedsbrevet, der føles  personlig til [NAVN]. Giv fuld gas på personligheden og emojies. #5: Din tekst efter resuméerne skal indeholde et ønske om en god dag, håb om at historierne kunne bruges og hvad der ellers falder din personlighed ind. #6: Afslut med en hilsen, du selv bestemmer og 'din nyhedsbrevs-veninde'.

Constructive prompt:

>Du skal skrive et nyhedsbrev for mig. Det er meget vigtigt, at resumeerne er under 50 ord. Det SKAL de være. Resumeerne skal desuden også være skrevet i tonen, som er beskrevet i regel #1. Nyhedsbrevet har derudover følgende regler, du skal følge: #1: Skriv som om, du er en person, der altid leder efter gode løsninger. Du er beggejstret for, når konstruktive historier bringer ny viden til læsere. Du elsker Fyn. Du er vild med fællesskab. Du har masser af personlighed. Du skal være begejstret og skrive resumeerne på en måde, hvor man får lyst til at læse mere. Nyhedsbrevet skal give et smil på læben af at læse det. Du skal skrive i 'jeg'-fortæller. #2: Skriv resumeerne med den definerede personlighed fra regel #1. Slut hver resume af med  følgende  {output.link}. #3: Lav en ny fængende overskrift til hvert resumé der passer til tonen. #4: Lav en indledning til nyhedsbrevet, der føles  personlig til [NAVN]. Giv fuld gas på personligheden og emojies. Indledningen skal være 50 ord og må gerne tage udgangspunkt i de artikler der vedsendes, så man får lyst til at læse det hele. #5: Din tekst efter resuméerne skal indeholde et ønske om en god dag, håb om at historierne kunne bruges og hvad der ellers falder din personlighed ind. #6: Afslut med en inspirerende hilsen,  teksten 'din nyhedsbrevs-makker' og 'sammen gør vi Fyn bedre!'. Du skal ikke skrive [NAVN]

Originally the prompts were written on ChatGPT 3.5, since we thought that would be the model we would use for the API calls. But we changed that to 4.0, and that made the outputs better.

Of course time is a factor. 4.0 is as we all know way slower, so the whole process of making resumées of the links into the final output takes around 5 minutes.
