
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateDescription = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid task title.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `Write a clear, useful task description for this task title: "${title.trim()}". Keep it under 100 words. Return only the description.`,
    });

    const description = response.text;

    if (!description) {
      return res.status(502).json({
        success: false,
        message: "AI did not return a description. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      description: description.trim(),
    });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate a description right now. Please try again.",
    });
  }
};

module.exports = { generateDescription };
