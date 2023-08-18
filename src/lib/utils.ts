import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
// The function is named cn and uses the spread syntax (...) to allow passing multiple arguments.
// ClassValue[]: ClassValue is a type (which might be imported from a CSS-in-JS library or defined elsewhere) that represents a CSS class name or an object of class names and their conditions. 
// ClassValue[] indicates that the function accepts an array of such values.
// `clsx()` conditionally concatenate class names
// twMerge() a function from a library like "twin.macro" (a popular utility for styling in React with Tailwind CSS) that processes and optimizes class names for better performance and compatibility.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// push(): Adds one or more elements to the end of an array and returns the new length of the array
// join(): Combine all the elements of an array into a single string. 
export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const remainingSeconds = seconds - hours * 3600 - minutes * 60
  const parts = []
  if (hours > 0) { parts.push(`${hours}h`) }
  if (minutes > 0) { parts.push(`${minutes}m`) }
  if (remainingSeconds > 0) { parts.push(`${remainingSeconds}s`) }
  return parts.join(" ")
}