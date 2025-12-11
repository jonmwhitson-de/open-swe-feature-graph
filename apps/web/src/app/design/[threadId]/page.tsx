"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureInsightsPanel } from "@/features/feature-insights";
import { useFeatureGraphStore } from "@/stores/feature-graph-store";

export default function FeatureDesignPage({
  params,
}: {
  params: { threadId: string };
}) {
  const { threadId } = params;
  const fetchGraphForThread = useFeatureGraphStore(
    (state) => state.fetchGraphForThread,
  );
  const clearFeatureGraph = useFeatureGraphStore((state) => state.clear);

  useEffect(() => {
    if (threadId) {
      void fetchGraphForThread(threadId);
    }

    return () => {
      clearFeatureGraph();
    };
  }, [clearFeatureGraph, fetchGraphForThread, threadId]);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="border-border bg-card/50 sticky top-0 z-10 border-b backdrop-blur">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" asChild>
            <Link href="/chat" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to chat
            </Link>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">
              Feature Design for Thread {threadId}
            </h1>
            <p className="text-muted-foreground text-sm">
              Explore the feature graph and related insights for this conversation.
            </p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="border-border bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle>Feature graph</CardTitle>
            </CardHeader>
            <CardContent className="border-muted-foreground/20 text-muted-foreground flex min-h-[480px] items-center justify-center rounded-lg border border-dashed">
              Feature graph canvas coming soon.
            </CardContent>
          </Card>

          <FeatureInsightsPanel onStartPlanner={() => {}} />
        </div>
      </main>
    </div>
  );
}
