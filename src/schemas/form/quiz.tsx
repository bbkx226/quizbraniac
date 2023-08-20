import { z } from 'zod' // zod is a TypeScript library for runtime validation of data

export const quizCreationSchemas = z.object({
    topic: z.string().min(4, {message:"Topic must be at least 4 characters long"}).max(50), // A string that must be between 4 and 50 characters
    type: z.enum(['mcq', 'open_ended']), // An enum that can only be 'mcq' or 'open_ended'
    amount: z.number().min(1).max(10), // A number between 1 and 10
})

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string(),
})