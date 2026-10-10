import { NextResponse } from "next/server";
import { z } from "zod";
import { getSiteSettings } from "@/lib/content";

const bodySchema = z.object({
  message: z.string().min(1).max(500),
  tags: z.array(z.string()).default([]),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { message, tags } = bodySchema.parse(json);
    const settings = await getSiteSettings();
    const replies = settings.sommelier.cannedReplies;

    const tagged = replies
      .filter((entry) => entry.tags.length > 0)
      .find((entry) =>
        entry.tags.every((tag) =>
          tags.map((value) => value.toLowerCase()).includes(tag.toLowerCase())
        )
      );

    const partial = replies
      .filter((entry) => entry.tags.length > 0)
      .find((entry) =>
        entry.tags.some((tag) =>
          tags.map((value) => value.toLowerCase()).includes(tag.toLowerCase())
        )
      );

    const fallback =
      replies.find((entry) => entry.tags.length === 0)?.reply ??
      "Share a flavor direction and I’ll suggest a short tasting flight.";

    const fromMessage = replies.find((entry) =>
      entry.tags.some((tag) =>
        message.toLowerCase().includes(tag.toLowerCase())
      )
    );

    const reply =
      tagged?.reply ?? partial?.reply ?? fromMessage?.reply ?? fallback;

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Sommelier is resting. Try again shortly." },
      { status: 500 }
    );
  }
}
