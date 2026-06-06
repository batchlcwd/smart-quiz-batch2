import OpenAI from "openai";

const openAiClient= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-5.4-mini",
})

export default openAiClient