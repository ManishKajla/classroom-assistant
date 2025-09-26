import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { prompt, assignmentContext } = await request.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const fullPrompt = `
You are an AI assistant helping students with their assignments. 
Assignment Context: ${assignmentContext || 'No specific assignment context provided'}

Student Question: ${prompt}

Please provide helpful, educational guidance that:
1. Helps the student understand the concepts
2. Provides step-by-step explanations
3. Encourages learning rather than just giving answers
4. Is appropriate for academic integrity

Response:
`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Error generating AI response:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    )
  }
}