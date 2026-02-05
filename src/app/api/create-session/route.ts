// app/api/create-session/route.ts
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod"; // Zod makes sure AI gives us JSON, not text
import mongoose from "mongoose";
import { Session } from "@/models/Session";

export async function POST(req: Request) {
  try {
    const { vibe, budget, city } = await req.json();

    // 1. Connect to DB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // 2. Ask Gemini for 3 distinct options
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        options: z
          .array(
            z.object({
              title: z.string().describe("Catchy title for the date"),
              description: z
                .string()
                .describe("Short enticing description, max 2 sentences"),
              location: z.string().describe("Name of the restaurant or place"),
              price: z.string().describe("Estimated total cost"),
            }),
          )
          .length(3), // FORCE it to generate exactly 3
      }),
      prompt: `Plan 3 completely different date ideas in ${city}. 
               Budget: ${budget}. 
               Vibe: ${vibe}. 
               Make them distinct (e.g., one food, one activity, one unique).`,
    });

    // 3. Save to MongoDB
    const newSession = await Session.create({
      creatorVibe: `${vibe} in ${city}`,
      options: result.object.options,
    });

    // 4. Return the ID to the frontend so we can redirect
    return Response.json({ sessionId: newSession._id });
  } catch (error) {
    console.error("AI Error:", error);
    return Response.json({ error: "Failed to generate plan" }, { status: 500 });
  }
}
