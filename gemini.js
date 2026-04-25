import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config();
const gemini_api_key = process.env.GEMINI_API_KEY;

const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig =
{
	temperature: 0.25,
	topP: 0.8,
	topK: 1,
	maxOutputTokens: 256,
	thinking: false
};
 
const geminiModel = googleAI.getGenerativeModel(
{
	model: "gemini-flash-lite-latest",
	geminiConfig,
});

export async function generate(prompt)
{
	try
	{
		const result = await geminiModel.generateContent(prompt);
		const response = result.response;

		return response;
	}
	catch (error)
	{
		return `Error generating content: ${error.message}`;
	}
};