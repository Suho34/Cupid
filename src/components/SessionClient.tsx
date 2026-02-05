// components/SessionClient.tsx
"use client";

import { useState } from "react";
import { submitVote } from "@/app/action";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface SessionData {
  _id: string;
  creatorVibe: string;
  options: any[];
  creatorVote: number;
  partnerVote: number;
}

export default function SessionClient({
  session,
  role,
}: {
  session: SessionData;
  role: "creator" | "partner";
}) {
  const [loading, setLoading] = useState(false);

  // 1. Check logic
  const myVote = role === "creator" ? session.creatorVote : session.partnerVote;
  const hasVoted = myVote !== -1;
  const bothVoted = session.creatorVote !== -1 && session.partnerVote !== -1;

  // 2. Result Logic
  const isMatch = bothVoted && session.creatorVote === session.partnerVote;
  const matchIndex = session.creatorVote; // If match, this is the winning index

  const handleVote = async (index: number) => {
    setLoading(true);
    await submitVote(session._id, index, role);
    setLoading(false);
  };

  // --- STATE 1: THE MATCH (Celebration) ---
  if (isMatch) {
    const winner = session.options[matchIndex];
    return (
      <div className="max-w-xl mx-auto text-center mt-10 p-6 bg-green-50 rounded-xl border-2 border-green-200">
        <h1 className="text-4xl mb-4">🎉 It&apos;s a Date!</h1>
        <p className="text-lg text-gray-600 mb-6">
          You both picked the same vibe.
        </p>

        <Card className="border-green-500 shadow-xl transform scale-105">
          <CardHeader>
            <CardTitle>{winner.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-green-700">
              {winner.price}
            </p>
            <p className="mt-2 text-gray-600">{winner.description}</p>
            <div className="mt-4 p-3 bg-white rounded border text-sm">
              📍 {winner.location}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- STATE 2: THE CONFLICT (Awkward...) ---
  if (bothVoted && !isMatch) {
    return (
      <div className="max-w-xl mx-auto text-center mt-10 p-6 bg-red-50 rounded-xl border-2 border-red-200">
        <h1 className="text-3xl mb-4">😅 Awkward...</h1>
        <p className="text-gray-700">You picked different dates.</p>
        <div className="flex justify-center gap-4 mt-6">
          {/* In a real app, you'd add a 'Reset' button here */}
          <Button variant="destructive">Ask AI to decide?</Button>
        </div>
      </div>
    );
  }

  // --- STATE 3: VOTING (Default) ---
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          {hasVoted ? "Waiting for partner..." : "Vote for your favorite!"}
        </h1>

        {/* Only show Copy Link to the Creator */}
        {role === "creator" && !bothVoted && (
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/session/${session._id}/join`,
              );
              alert("Link copied! Send it to your partner.");
            }}
          >
            🔗 Copy Partner Link
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {session.options.map((option, index) => (
          <Card
            key={index}
            className={`transition-all duration-200 border-2 ${myVote === index
                ? "border-purple-500 bg-purple-50"
                : "hover:border-purple-200"
              }`}
          >
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                {option.price}
              </Badge>
              <CardTitle className="text-base mt-2">{option.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>
              <p className="text-xs font-bold text-gray-500">
                📍 {option.location}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={hasVoted || loading}
                onClick={() => handleVote(index)}
                variant={myVote === index ? "default" : "outline"}
              >
                {myVote === index ? "You Voted This" : "Vote"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
