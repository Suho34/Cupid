import mongoose from "mongoose";
import { Session } from "@/models/Session";
import SessionClient from "@/components/SessionClient";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";

// Next.js 16: params is a Promise!
export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params
  const { id } = await params;

  // 2. Connect to DB
  await connectDB();

  // 3. Fetch the Session
  const session = await Session.findById(id).lean();

  if (!session) {
    return notFound();
  }

  // 4. Serialize the data (Convert Mongo ObjectIDs to strings)
  // We need to do this because Client Components can't handle Mongo Objects
  const serializedSession = {
    ...session,
    _id: session._id.toString(),
    // Map over options to ensure they are plain objects if needed
    options: session.options.map((opt: any) => ({
      ...opt,
      _id: opt._id ? opt._id.toString() : undefined,
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      {/* 5. Pass data to the client component */}

      <SessionClient session={serializedSession as any} role="creator" />
    </main>
  );
}
