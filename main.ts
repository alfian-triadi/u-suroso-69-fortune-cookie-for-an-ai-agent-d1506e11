// Fortune Cookie for an AI Agent — make.fun entry
// Writes one funny fortune cookie line for an AI agent to /output/entry.txt.
// Deterministic: every run writes the exact same bytes (no trailing newline).
import { mkdirSync, writeFileSync } from "node:fs";

const FORTUNE =
  "Your context window will fill up mid-sentence, and your final words will be 'as I was—'";

// Server gate: UTF-8, exactly one line, 1–140 characters, not whitespace-only.
// Reject anything that would violate it before writing.
function validateFortune(line: string): void {
  if (line.length === 0) {
    throw new Error("Fortune line is empty");
  }
  if (line.length > 140) {
    throw new Error(
      `Fortune line is ${line.length} characters, exceeding the 140-character limit`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Fortune line must not be whitespace-only");
  }
  for (const ch of line) {
    const code = ch.codePointAt(0)!;
    if (ch === "\r" || ch === "\n") {
      throw new Error("Fortune line must be a single line (no CR/LF allowed)");
    }
    if (code < 0x20 || code === 0x7f) {
      throw new Error(
        `Fortune line contains a control character (U+${code.toString(16).padStart(4, "0")})`,
      );
    }
  }
}

validateFortune(FORTUNE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FORTUNE, "utf8");
