<script>
  import { onDestroy } from "svelte";

  import {
    MODEL_OPTIONS,
    SORT_OPTIONS,
    NUM_TOKENS,
    filters,
  } from "../store.js";

  let search = "";
  let sortBy = "";
  let model = "";
  let numTokens = null;

  function handleSearchInput(event) {
    filters.set({ sortBy, numTokens, model, search: event.target.value });
  }

  function handleLimit(event) {
    filters.set({ search, sortBy, model, numTokens: +event.target.value });
  }

  function handleModel(event) {
    filters.set({ search, sortBy, numTokens, model: event.target.value });
  }

  function handleSort(event) {
    filters.set({ search, numTokens, model, sortBy: event.target.value });
  }

  const unsubscribe = filters.subscribe((value) => {
    ({ search, sortBy, numTokens, model } = value);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<header
  class="fixed w-full bg-white p-2 border-solid border-b-2 border-indigo-500"
>
  <form
    class="flex w-full align-center items-center justify-between"
    on:submit|preventDefault
  >
    <div class="basis-1/2">
      <label for="search">
        <input
          class="p-2 w-full"
          type="text"
          placeholder="Search..."
          on:input="{handleSearchInput}"
        />
      </label>
    </div>
    <div>
      <label for="sort">
        Sort by:
        <select bind:value="{sortBy}" on:change="{handleSort}">
          {#each SORT_OPTIONS as sortOption }
          <option value="{sortOption}">{sortOption}</option>
          {/each}
        </select>
      </label>

      <label for="model">
        Model:
        <select bind:value="{model}" on:change="{handleModel}">
          {#each MODEL_OPTIONS as modelOption }
          <option value="{modelOption}">{modelOption}</option>
          {/each}
        </select>
      </label>

      <label for="numTokens">
        Num tokens:
        <select bind:value="{numTokens}" on:change="{handleLimit}">
          {#each NUM_TOKENS as numToken }
          <option value="{numToken}">{numToken}</option>
          {/each}
        </select>
      </label>
    </div>
  </form>
</header>
