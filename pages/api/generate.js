// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const config = {
  runtime: "edge",
};
export default async function handler(req, res) {
  const reqData = await req.json();
  const role = reqData.messages[0].content;
  const prompt = reqData.messages[1].content;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: role },
        { role: "user", content: prompt },
      ],
    }),  };

  const response = await fetch(process.env.OPENAI_API_URL, options);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = response.body;
  if (!data) {
    throw new Error("No data received");
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let tempValue = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    let chunkValue = decoder.decode(value);

    // if there is a temp value, prepend it to the incoming chunk
    if (tempValue) {
      chunkValue = tempValue + chunkValue;
      tempValue = "";
    }

    // match json string and extract it from the chunk
    const match = chunkValue.match(/\{(.*?)\}/);
    if (match) {
      tempValue = chunkValue.replace(match[0], "");
      chunkValue = match[0];
    }

    try {
      const data = JSON.parse(chunkValue);
      return Response.json(data);

      /* do something with the data */
    } catch (e) {
      // store the incomplete json string in the temporary value
      tempValue = chunkValue;
    }
  }
}
