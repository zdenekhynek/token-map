<script>
  import { onMount } from "svelte";
  import Search from "./lib/Search.svelte";

  let text = "";
  let allItems = [];
  let itemsToDisplay = [];

  let filters = {
    search: "",
  };
  let sort = "length.asc";

  onMount(() => {
    loadItems();
  });

  const loadItems = async () => {
    const response = await fetch("./ada.txt");
    text = await response.text();
    allItems = text.split("\n");//.slice(0, 10000);
    allItems.sort((a, b) => b.length - a.length);

    const limit = 10000;
    itemsToDisplay = allItems.slice(0, limit);
  };

  function handleInput(event) {
    filters.search = event.target.value;
    applyFilters();
  }

  function applyFilters() {
    if (filters.search) {
      itemsToDisplay = allItems.filter((item) =>
        item.toLowerCase().includes(filters.search.toLowerCase())
      );
    } else {
      itemsToDisplay = allItems;
    }
  }

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

  function handle_select(event) {
    console.log(event, event.detail);
  }
</script>

<main class="flex flex-wrap">
  <Search onInput="{handleInput}" />
  {#each itemsToDisplay as item,index}
  <div class="p-1 {colors[index % colors.length]}">{item}</div>
  {/each}
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
