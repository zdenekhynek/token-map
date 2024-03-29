import { writable } from "svelte/store";

export const MODEL_OPTIONS = [
  "cl100k_base",
  "gpt2",
  "p50k_base",
  "p50k_edit",
  "r50k_base",
];
export const SORT_OPTIONS = ["length.asc", "length.desc"];
export const NUM_TOKENS = [1 * 500, 10 * 1000, 100 * 1000, Infinity];

export const DEFAULT_FILTERS = {
  search: "",
  model: MODEL_OPTIONS[0],
  sortBy: SORT_OPTIONS[1],
  numTokens: NUM_TOKENS[0],
};

export const filters = writable(DEFAULT_FILTERS);

export function updateNumTokens(numTokens) {
  filters.update((filters) => {
    console.log("filters update", filters, numTokens);
    return { ...filters, numTokens };
  });
}
