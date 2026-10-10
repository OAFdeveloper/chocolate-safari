"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; ok?: boolean };
      if (!response.ok) {
        throw new Error(data.error || "Unable to subscribe right now.");
      }
      setStatus("success");
      setMessage("You’re on the list — tasting notes incoming.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          className="h-10 flex-1 rounded-lg border-border bg-bg-base text-text-on-dark placeholder:text-text-muted"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-10 rounded-lg bg-brass px-3 text-bg-base hover:bg-brass-hover"
          aria-label="Subscribe"
        >
          <ArrowRight className="size-4" />
        </Button>
      </form>
      {message ? (
        <p
          className={
            status === "success"
              ? "mt-2 text-xs text-brass"
              : "mt-2 text-xs text-red-300"
          }
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
