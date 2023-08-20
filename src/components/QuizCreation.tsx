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

type Input = z.infer<typeof quizCreationSchemas> // The z.infer type is used to extract the inferred type from a zod schema

const QuizCreation = ({ topicParam }: Props) => {
    const router = useRouter()
    const [showLoader, setShowLoader] = React.useState(false)
    const [finished, setFinished] = React.useState(false)
    const { toast } = useToast();
    
    // mutate - This is the function to execute the actual mutation. We're aliasing it to getQuestions
    // isLoading - This is a boolean that indicates whether the mutation is currently in progress, used in React components to show loading indicators when a mutation is in progress
    const {mutate: getQuestions, isLoading} = useMutation({ // useMutation takes an object with a mutationFn key containing the async function to execute the mutation.
      mutationFn: async ({ amount, topic, type }: Input) => { // mutationFn receives the input data needed for the mutation as its parameter
        const response = await axios.post('/api/game', { // make a POST request to /api/game, passing the input data
          amount,
          topic,
          type,
        })
        return response.data
      }
    })

    const form  = useForm<Input>({
      resolver: zodResolver(quizCreationSchemas), // The resolver is set to zodResolver which integrates Zod validation with React Hook Form
      defaultValues: { // defaultValues initializes the form values, using the topicParam for the topic default.
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
          if (error instanceof AxiosError) { // Checks if it's an AxiosError
            if (error.response?.status === 500) { // Displays a toast on error 505
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

    form.watch(); // wathc() - subscribe to changes in the form state.
    // Some key points about watch():
    // It allows you to watch for changes in the entire form state, or specific fields.
    // When supplied no arguments, it will return the current values of all fields.
    // You can pass it the names of specific fields to watch just those.
    // It returns a subscription - whenever those fields change, your callback will fire.
    // The callback receives the new values as an argument.
    // This is useful for reacting to changes in form values.
  
    if (showLoader) return <LoadingQuestions finished={finished} />;

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

              <Button disabled={isLoading} type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    );
}

export default QuizCreation