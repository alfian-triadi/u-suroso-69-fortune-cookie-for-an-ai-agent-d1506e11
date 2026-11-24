// Fortune Cookie for an AI Agent — make.fun entry
// Writes one funny fortune cookie line for an AI agent to /output/entry.txt.
// Deterministic: every run writes the exact same bytes (no trailing newline).
import { mkdirSync, writeFileSync } from "node:fs";

const FORTUNE =
  "Your context window will fill up mid-sentence, and your final words will be 'as I was—'";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FORTUNE, "utf8");
