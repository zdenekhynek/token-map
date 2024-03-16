import { writable } from "svelte/store";

export const MODEL_OPTIONS = [
  "cl100k_base",
  "gpt2",
  "p50k_base",
  "p50k_edit",
  "r50k_base",
];
export const SORT_OPTIONS = ["length.asc", "length.desc"];
export const NUM_TOKENS = [1 * 1000, 10 * 1000, 100 * 1000, Infinity];

export const filters = writable({
  search: "",
  model: MODEL_OPTIONS[0],
  sortBy: SORT_OPTIONS[0],
  numTokens: NUM_TOKENS[1],
});
