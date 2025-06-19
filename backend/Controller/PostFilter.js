import { extractKeywords } from "../Utils/gemini.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const filterPosts =async(req,res)=>{
    try {
        const userInput = req.body.query;
        console.log("User input: "+ req.body.query);
        const keyword = await extractKeywords(userInput);
        const query = keyword ;
        console.log("query: " + query);
        const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
        params: {
            key: process.env.GOOGLE_API_KEY,
            cx: process.env.GOOGLE_CX,
            q: query
        },
        withCredentials: true
        });
        const items = response.data.items || [];
        const products = items.map(item => ({
        title: item.title,
        summary: item.snippet,
        image: item.pagemap?.cse_image?.[0]?.src || null,
        link: item.link
        }));

        res.status(200).json({
            success: true,
            message: "Search results fetched successfully",
            products: products
        })
    } catch (err) {
        console.error("Error fetching search:", err.message.data);
         console.error("Error fetching search:"); // General error message
        if (err.response) {
            console.error("Status:", err.response.status); // Log the HTTP status code (e.g., 403)
            console.error("Response data:", err.response.data); // Log response body (might be empty/undefined for 403)
            console.error("Response headers:", err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            console.error("No response received from server. Request:", err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", err.message); // Log the fundamental error message (e.g., "Network Error")
        }
        res.status(500).json({
            success: false,
            message: "Error fetching search results",
            error: err.message
        });
    }
}