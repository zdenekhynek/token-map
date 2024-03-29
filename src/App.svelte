<script>
  import { onMount, onDestroy } from "svelte";
  import InfiniteLoading from "svelte-infinite-loading";

  import Header from "./lib/Header.svelte";
  import { filters, updateNumTokens, filterItemsByCategory } from "./store.js";

  export const PAGE_SIZE = 1000;

  let isLoading = false;
  let allItems = [];
  let itemsToDisplay = [];
  let storeFilters = {};

  async function loadItems(model) {
    const response = await fetch(`./data/${model}.txt`);
    const text = await response.text();
    allItems = text.split("\n");
  }

  function sortItems(items, sortBy) {
    const [field, order] = sortBy.split(".");
    items.sort((a, b) => {
      if (field === "length") {
        if (order === "asc") {
          return a.length - b.length;
        } else {
          return b.length - a.length;
        }
      }
    });

    return items;
  }

  function applyFilters(items, filters) {
    let newItemsToDisplay = items;

    if (filters.category) {
      newItemsToDisplay = filterItemsByCategory(items, filters.category);
    }

    if (filters.search) {
      newItemsToDisplay = newItemsToDisplay.filter((item) => {
        return item.toLowerCase().includes(filters.search.toLowerCase());
      });
    }

    if (filters.sortBy) {
      newItemsToDisplay = sortItems(newItemsToDisplay, filters.sortBy);
    }

    if (filters.numTokens) {
      newItemsToDisplay = newItemsToDisplay.slice(0, filters.numTokens);
    }

    itemsToDisplay = newItemsToDisplay;
  }

  function infiniteHandler({ detail: { loaded, complete } }) {
    if (storeFilters.numTokens) {
      const originalLength = itemsToDisplay.length;
      updateNumTokens(storeFilters.numTokens + PAGE_SIZE);
      setTimeout(() => {
        loaded();

        if (itemsToDisplay.length === originalLength) {
          complete();
        }
      }, 1000);
    }
  }

  const unsubscribe = filters.subscribe(async (newFilters) => {
    try {
      //  see if we're chaging dataset
      if (newFilters.model !== storeFilters.model) {
        isLoading = true;
        await loadItems(newFilters.model);
        isLoading = false;
      }

      storeFilters = newFilters;
      applyFilters(allItems, storeFilters);
    } catch (err) {
      console.error(err);
    }
  });

  onMount(() => {});

  onDestroy(() => {
    unsubscribe();
  });

  const colors = [
    "bg-slate-50",
    "bg-sky-200",
    "bg-amber-200",
    "bg-green-200",
    "bg-orange-200",
    "bg-purple-200",
    "bg-indigo-200",
    "bg-lime-200",
    "bg-rose-200",
    "bg-violet-200",
    "bg-yellow-200",
    "bg-emerald-200",
    "bg-zinc-200",
    "bg-red-200",
    "bg-fuchsia-200",
    "bg-pink-200",
  ];
</script>

<main>
  <Header />

  <div class="flex flex-wrap pt-40 sm:pt-20">
    {#if isLoading}
    <div>Is loading...</div>
    {/if} {#each itemsToDisplay as item,index}
    <span class="p-1 {colors[index % colors.length]}">{item}</span>
    {/each} {#if !isLoading}
    <InfiniteLoading on:infinite="{infiniteHandler}" />
    {/if}
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
