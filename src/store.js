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

export const CATEGORIES = [
  ".with dot",
  "ALL CAPITALS",
  "all symbols",
  "non-latin",
];

export const DEFAULT_FILTERS = {
  search: "",
  category: "",
  model: MODEL_OPTIONS[0],
  sortBy: SORT_OPTIONS[1],
  numTokens: NUM_TOKENS[0],
};

export const filters = writable(DEFAULT_FILTERS);

export function updateNumTokens(numTokens) {
  filters.update((filters) => {
    return { ...filters, numTokens };
  });
}

export function updateSearch(search) {
  filters.update((filters) => {
    return { ...filters, search };
  });
}

export function updateModel(model) {
  filters.update((filters) => {
    return { ...filters, model };
  });
}

export function updateCategory(category) {
  filters.update((filters) => {
    return { ...filters, category };
  });
}

export function updateSortBy(sortBy) {
  filters.update((filters) => {
    return { ...filters, sortBy };
  });
}

export function isNonLatinLetters(string) {
  // Matches strings that consist entirely of letter characters
  const letterRegex = /^\p{L}+$/u;

  // Matches strings that contain at least one Latin letter (uppercase or lowercase)
  const latinLetterRegex = /[a-zA-Z]/;

  return letterRegex.test(string) && !latinLetterRegex.test(string);
}

export function isAllCapItem(item) {
  return item === item.toUpperCase();
}

export function isSymbolItem(item) {
  const regex = /^[^a-zA-Z0-9\s]+$/;
  return regex.test(item.trim());
}

export function isDotItem(item) {
  return item.startsWith(".");
}

export function filterItemsByCategory(items, category) {
  if (!Array.isArray(items)) {
    return [];
  }

  if (!category) {
    return items;
  }

  return items.filter((item) => {
    //  with dot filtering
    if (category === CATEGORIES[0]) {
      return isDotItem(item);
    }

    //  ALL CAPITALS filtering
    if (category === CATEGORIES[1]) {
      return item.trim() !== "" && isAllCapItem(item) && !isSymbolItem(item);
    }

    //  all symbols filtering
    if (category === CATEGORIES[2]) {
      return isSymbolItem(item) && !isNonLatinLetters(item);
    }

    if (category === CATEGORIES[3]) {
      return isNonLatinLetters(item);
    }

    return true;
  });
}
