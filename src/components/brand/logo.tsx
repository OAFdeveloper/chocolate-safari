import Link from "next/link";
import { cn } from "@/lib/utils";

export function CocoaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7 text-brass", className)}
    >
      <path
        d="M16 3c-2.8 3.4-5.2 6.2-6.8 9.2-1.8 3.4-2.2 6.2-1.2 8.6 1.2 2.8 3.8 4.6 7.2 5.4.4.1.8.1 1.2.1s.8 0 1.2-.1c3.4-.8 6-2.6 7.2-5.4 1-2.4.6-5.2-1.2-8.6C21.2 9.2 18.8 6.4 16 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.5c-1.4 2-2.6 3.8-3.4 5.6-.8 1.8-.9 3.2-.3 4.3.7 1.4 2.1 2.3 3.7 2.7 1.6-.4 3-1.3 3.7-2.7.6-1.1.5-2.5-.3-4.3-.8-1.8-2-3.6-3.4-5.6Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M12.2 14.2c1.1.4 2.4.6 3.8.6s2.7-.2 3.8-.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 text-text-on-dark transition-colors hover:text-brass",
        className
      )}
    >
      <CocoaMark />
      <span className="font-display text-[19px] leading-none tracking-tight">
        Chocolate Safari
      </span>
    </Link>
  );
}
