// components/ConditionalLink.js
export default function ConditionalLink() {
    const today = new Date();
    const dateLinks = [
        { date: '2023-07-17', link: 'https://tv2fyn914166.typeform.com/to/GScTuQX6' },
        { date: '2023-07-18', link: 'https://tv2fyn914166.typeform.com/to/MqUkQy8C' },
        { date: '2023-07-19', link: 'https://tv2fyn914166.typeform.com/to/adGxnb7Y' },
        { date: '2023-07-20', link: 'https://tv2fyn914166.typeform.com/to/guMpNzmP' },
        { date: '2023-07-21', link: 'https://tv2fyn914166.typeform.com/to/R82K4qWM' },
        { date: '2023-07-24', link: 'https://tv2fyn914166.typeform.com/to/FZ38r9PU' },
        { date: '2023-07-25', link: 'https://tv2fyn914166.typeform.com/to/e8sQHqPB' },
        { date: '2023-07-26', link: 'https://tv2fyn914166.typeform.com/to/MDFvYabW' },
        { date: '2023-07-27', link: 'https://tv2fyn914166.typeform.com/to/PoJrAUmX' },
        { date: '2023-07-28', link: 'https://tv2fyn914166.typeform.com/to/lAQCwIlb' },
      ];
      
  
    for (let dateLink of dateLinks) {
      // Check if today's date is greater than the date in the current object
      if (today > new Date(dateLink.date)) {
        return (
          <a href={dateLink.link} className="text-rd-purple hover:underline">
            Hvordan var dagens nyhedsbrev? <br></br>Udfyld det korte spørgeskema her.
          </a>
        );
      }
    }
  
    // Render nothing if no condition is met
    return null;
  }
  