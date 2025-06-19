import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const extractKeywords=async(userInput)=> {
    
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent([
      {
        text: `Return a space-separated list of concise keywords that can be directly used in a product search query. Do not use punctuation, do not number the items, and do not explain anything. Here is the user input: "${userInput}"`
      }
    ]);

    const response = await result.response;
    const text = await response.text();
    console.log("Gemini raw response:", text);

    return text.trim();
  } catch (err) {
    console.error("Gemini error:", err);
    return ["No keywords"];
  }
}
