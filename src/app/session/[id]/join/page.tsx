import mongoose from "mongoose";
import { Session } from "@/models/Session";
import SessionClient, { SessionData } from "@/components/SessionClient";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const session = await Session.findById(id).lean();

  if (!session) return notFound();

  // Serialization again
  const serializedSession = {
    ...session,
    _id: session._id.toString(),
    options: session.options.map((opt: any) => ({
      ...opt,
      _id: opt._id ? opt._id.toString() : undefined,
    })),
  };

  return (
    <main className="min-h-screen bg-purple-50 py-10 px-4">
      {" "}
      {/* Different background color to distinguish */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-purple-700">
          You&apos;ve been invited to a Date Vote!
        </h2>
      </div>
      {/* THE ONLY CHANGE: role="partner" */}
      <SessionClient
        session={serializedSession as unknown as SessionData}
        role="partner"
      />
    </main>
  );
}
