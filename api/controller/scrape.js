const axios = require("axios");
const cheerio = require("cheerio");

exports.postScrape = async (req, res, next) => {
  const url = req.query.url;
  console.log(url);

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Example of flexible selectors
    const selectors = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "ul",
      "ol",
      "li",
      "div",
      "table",
      "strong",
    ];

    let scrapedData = [];

    selectors.forEach((selector) => {
      $(selector).each((index, element) => {
        const text = $(element).text().trim();
        if (text) {
          scrapedData.push(text);
        }
      });
    });

    const fullText = scrapedData.join(" ");

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: `Summarize the following content:\n\n${fullText}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    let openAiResponse = openaiResponse.data.choices[0].message.content;

    res.json({
      success: true,
      message: "Article summarized successfully",
      data: openAiResponse,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "We are facing some issues, please try again" });
  }
};
