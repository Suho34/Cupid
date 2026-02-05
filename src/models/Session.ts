// models/Session.ts
import mongoose from "mongoose";

// Sub-schema for a single date option (we need 3 of these per session)
const OptionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true }, // e.g., "$50"
});

const SessionSchema = new mongoose.Schema({
  creatorVibe: { type: String }, // e.g. "Chill vibes in Delhi"

  // This is where the AI data lives
  options: [OptionSchema],

  // The Voting Logic
  creatorVote: { type: Number, default: -1 }, // -1 means "Hasn't voted"
  partnerVote: { type: Number, default: -1 },

  createdAt: { type: Date, default: Date.now },
});

// This check prevents "Model already defined" errors in Next.js hot-reloading
export const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
