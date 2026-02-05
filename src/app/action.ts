"use server";

import mongoose from "mongoose";
import { Session } from "@/models/Session";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";

export async function submitVote(
  sessionId: string,
  voteIndex: number,
  role: "creator" | "partner",
) {
  try {
    // 1. Ensure DB connection
    await connectDB();

    // 2. Find the session
    const session = await Session.findById(sessionId);
    if (!session) throw new Error("Session not found");

    // 3. Update the correct vote field
    if (role === "creator") {
      session.creatorVote = voteIndex;
    } else {
      session.partnerVote = voteIndex;
    }

    // 4. Save
    await session.save();

    // 5. Refresh the UI instantly for everyone looking at this page
    revalidatePath(`/session/${sessionId}`);

    return { success: true };
  } catch (error) {
    console.error("Vote Error:", error);
    return { success: false, error: "Failed to submit vote" };
  }
}
