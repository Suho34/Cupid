"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Define your form schema (Validation rules)
const formSchema = z.object({
  city: z.string().min(2, "City name must be at least 2 characters"),
  budget: z.string().min(1, "Please select a budget"),
  vibe: z.string().min(3, "Vibe must be descriptive (e.g., 'Romantic')"),
});

export default function CreateSessionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 2. Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      budget: "",
      vibe: "",
    },
  });

  // 3. Handle Submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // Call our AI backend
      const response = await fetch("/api/create-session", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.sessionId) {
        // Redirect to the Creator Page
        router.push(`/session/${data.sessionId}`);
      }
    } catch (error) {
      console.error("Failed to create session", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-8 rounded-3xl glass backdrop-blur-2xl border-white/20 shadow-2xl"
        >
          {/* City Input */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium">Where are you?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mumbai, NYC, London..."
                    {...field}
                    className="bg-white/50 border-white/20 focus:bg-white/80 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget Select */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium">Budget</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/50 border-white/20 focus:bg-white/80 transition-all duration-300">
                      <SelectValue placeholder="Select a budget" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cheap ($)">Cheap ($)</SelectItem>
                    <SelectItem value="Moderate ($$)">Moderate ($$)</SelectItem>
                    <SelectItem value="Luxury ($$$)">Luxury ($$$)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vibe Input */}
          <FormField
            control={form.control}
            name="vibe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium">What&apos;s the Vibe?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cozy, Adventure, Sushi, Rooftop..."
                    {...field}
                    className="bg-white/50 border-white/20 focus:bg-white/80 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
            disabled={loading}
          >
            {loading ? "Asking Cupid..." : "Plan My Date 💘"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
