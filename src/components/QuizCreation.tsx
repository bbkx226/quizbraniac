'use client'

import React from 'react'
import { CardDescription } from './ui/card'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { useForm } from 'react-hook-form'
import { quizCreationSchemas } from '@/schemas/form/quiz'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BookOpen, CopyCheck } from 'lucide-react'
import { Separator } from './ui/separator'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import LoadingQuestions from './LoadingQuestions'
import { useToast } from "./ui/use-toast";

type Props = {
    topicParam: string
}

type Input = z.infer<typeof quizCreationSchemas>

const QuizCreation = ({ topicParam }: Props) => {
    const router = useRouter()
    const [showLoader, setShowLoader] = React.useState(false)
    const [finished, setFinished] = React.useState(false)
    const { toast } = useToast();
    const {mutate: getQuestions, isLoading} = useMutation({
        mutationFn: async ({ amount, topic, type }: Input) => {
            const response = await axios.post('/api/game', {
                amount,
                topic,
                type,
            })
            return response.data
        }
    })

    const form  = useForm<Input>({
        resolver: zodResolver(quizCreationSchemas),
        defaultValues: {
            topic: topicParam,
            amount: 3,
            type: 'open_ended'
        }
    })

    const onSubmit = async (data: Input) => {
        setShowLoader(true);
        getQuestions(data, {
          onError: (error) => {
            setShowLoader(false);
            if (error instanceof AxiosError) {
              if (error.response?.status === 500) {
                toast({
                  title: "Error",
                  description: "Something went wrong. Please try again later.",
                  variant: "destructive",
                });
              }
            }
          },
          onSuccess: ({ gameId }: { gameId: string }) => {
            setFinished(true);
            setTimeout(() => {
              if (form.getValues("type") === "mcq") {
                router.push(`/play/mcq/${gameId}`);
              } else if (form.getValues("type") === "open_ended") {
                router.push(`/play/open-ended/${gameId}`);
              }
            }, 2000);
          },
        });
      };
      form.watch();
    
      if (showLoader) {
        return <LoadingQuestions finished={finished} />;
      }

    return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
            <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter a topic" {...field} />
                    </FormControl>
                    <FormDescription>
                        Please provide any topic you would like to be quizzed on
                        here.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="How many questions?"
                        type="number"
                        {...field}
                        onChange={(e) => {
                            form.setValue("amount", parseInt(e.target.value));
                        }}
                        min={1}
                        max={10}
                        />
                    </FormControl>
                    <FormDescription>
                        You can choose how many questions you would like to be
                        quizzed on here.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <div className="flex justify-between">
                <Button
                    variant={
                    form.getValues("type") === "mcq" ? "default" : "secondary"
                    }
                    className="w-1/2 rounded-none rounded-l-lg"
                    onClick={() => {
                    form.setValue("type", "mcq");
                    }}
                    type="button"
                >
                    <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                    variant={
                    form.getValues("type") === "open_ended"
                        ? "default"
                        : "secondary"
                    }
                    className="w-1/2 rounded-none rounded-r-lg"
                    onClick={() => form.setValue("type", "open_ended")}
                    type="button"
                >
                    <BookOpen className="w-4 h-4 mr-2" /> Open Ended
                </Button>
                </div>
                <Button disabled={isLoading} type="submit">
                Submit
                </Button>
            </form>
            </Form>
        </CardContent>
        </Card>
    </div>
    );
}

export default QuizCreation