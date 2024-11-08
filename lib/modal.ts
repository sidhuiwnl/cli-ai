import 'dotenv/config'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const modal = genAI.getGenerativeModel({
    model : "gemini-1.5-flash",
    generationConfig : {
        candidateCount : 1,
        stopSequences : ["x"],
        maxOutputTokens : 20,
        temperature : 1.0,
    }
})

