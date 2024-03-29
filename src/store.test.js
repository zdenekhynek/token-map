import { describe, it, expect } from "vitest";

import { CATEGORIES, filterItemsByCategory, isSymbolItem } from "./store.js";

describe("store", () => {
  describe("isSymbolItem", () => {
    it("is string just symbols", () => {
      expect(isSymbolItem("fas")).toBeFalsy();
      expect(isSymbolItem("******")).toBeTruthy();
      expect(isSymbolItem("------------------------------")).toBeTruthy();
    });
  });

  describe("filterItemsByCategory", () => {
    it("returns an empty array for non-array inputs", () => {
      expect(filterItemsByCategory(null, CATEGORIES[0])).toEqual([]);
      expect(filterItemsByCategory(undefined, CATEGORIES[0])).toEqual([]);
      expect(filterItemsByCategory({}, CATEGORIES[0])).toEqual([]);
    });

    it("returns the original array if no category is provided", () => {
      const items = ["a", "B", ".c"];
      expect(filterItemsByCategory(items, "")).toEqual(items);
      expect(filterItemsByCategory(items, null)).toEqual(items);
    });

    it("filters items starting with a dot", () => {
      const items = ["a", ".b", ".c", "d"];
      expect(filterItemsByCategory(items, CATEGORIES[0])).toEqual([".b", ".c"]);
    });

    it("filters items in ALL CAPITALS", () => {
      const items = [
        "a",
        "B",
        "ALLCAPS",
        "NoCaps",
        "///",
        "','','",
        "************",
      ];
      expect(filterItemsByCategory(items, CATEGORIES[1])).toEqual([
        "B",
        "ALLCAPS",
      ]);
    });

    it("filters items with symbols", () => {
      const items = [
        "a",
        "!@#",
        "$%^",
        "abc",
        "123",
        ".CompilerServices",
        "ελληνικά",
      ];
      expect(filterItemsByCategory(items, CATEGORIES[2])).toEqual([
        "!@#",
        "$%^",
      ]);
    });

    it("filters items with non-latin characters", () => {
      const items = [
        "hello",
        "こんにちは",
        "123",
        "漢字",
        "Español",
        "русский",
        "串",
      ];
      expect(filterItemsByCategory(items, CATEGORIES[3])).toEqual([
        "こんにちは",
        "漢字",
        "русский",
        "串",
      ]);
    });

    // Add more tests as needed to cover edge cases or other categories
  });
});
