import CreateSessionForm from "@/components/CreateSessionForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements if needed, but the body gradient does the heavy lifting */}

      <div className="text-center mb-12 space-y-6 z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground font-heading">
          Stop arguing. <br />
          <span className="text-primary drop-shadow-sm">Start dating.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Let AI plan 3 perfect date options. You vote. They vote. It&apos;s a
          match.
        </p>
      </div>

      <div className="w-full max-w-md z-10">
        <CreateSessionForm />
      </div>

      <div className="mt-16 text-sm text-muted-foreground/60 font-medium">
        Built with Next.js 16, Gemini AI & Cupid&apos;s Arrow
      </div>
    </main>
  );
}
