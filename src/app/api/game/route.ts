import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { quizCreationSchemas } from '@/schemas/form/quiz'
import { z } from "zod";
import { prisma } from "@/lib/db";
import axios from 'axios';

// /api/game
export async function POST(req: Request, res: Response) {
    try {
      const session = await getAuthSession();
      if (!session?.user) {
        return NextResponse.json(
          { error: "You must be logged in to create a game." },
          {
            status: 401,
          }
        );
      }
      
      const body = await req.json(); // handle the request and get the JSON body
      const { topic, type, amount } = quizCreationSchemas.parse(body); // It is destructuring the properties topic, type, and amount from the JSON body after parsing it. 
      const game = await prisma.game.create({
        data: {
          gameType: type,
          timeStarted: new Date(),
          userId: session.user.id,
          topic,
        },
      });
      // It's using the topic variable passed in to the endpoint as the where condition to find an existing record.
      // If no existing record is found, it will create a new record with the topic name and a count initialized to 1.
      // If a record already exists, it will increment the count by 1 instead of creating a new record.
      // This allows the topic_count table to keep a running count of quiz topics and increment the count each time a new quiz is created for that topic.
      await prisma.topic_count.upsert({
        where: {
          topic,
        },
        create: {
          topic,
          count: 1,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      const { data } = await axios.post(
        `${process.env.API_URL as string}/api/questions`,
        {
          amount,
          topic,
          type,
        }
      );
  
      if (type === "mcq") {
        type mcqQuestion = {
          question: string;
          answer: string;
          option1: string;
          option2: string;
          option3: string;
        };
  
        const manyData = data.questions.map((question: mcqQuestion) => {
          // mix up the options lol
          const options = [
            question.option1,
            question.option2,
            question.option3,
            question.answer,
          ].sort(() => Math.random() - 0.5);
          return {
            question: question.question,
            answer: question.answer,
            options: JSON.stringify(options),
            gameId: game.id,
            questionType: "mcq",
          };
        });
  
        await prisma.question.createMany({
          data: manyData,
        });
      } else if (type === "open_ended") {
        type openQuestion = {
          question: string;
          answer: string;
        };
        await prisma.question.createMany({
          data: data.questions.map((question: openQuestion) => {
            return {
              question: question.question,
              answer: question.answer,
              gameId: game.id,
              questionType: "open_ended",
            };
          }),
        });
      }
  
      return NextResponse.json({ gameId: game.id }, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: error.issues },
          {
            status: 400,
          }
        );
      } else {
        return NextResponse.json(
          { error: "An unexpected error occurred." },
          {
            status: 500,
          }
        );
      }
    }
  }