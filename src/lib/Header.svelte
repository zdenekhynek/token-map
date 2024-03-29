<script>
  import { onDestroy } from "svelte";

  import {
    MODEL_OPTIONS,
    SORT_OPTIONS,
    NUM_TOKENS,
    DEFAULT_FILTERS,
    CATEGORIES,
    filters,
    updateSearch,
    updateSortBy,
    updateModel,
    updateCategory,
  } from "../store.js";

  let search = "";
  let sortBy = "";
  let model = "";
  let category = "";
  let numTokens = null;

  function handleSearchInput(event) {
    updateSearch(event.target.value);
  }

  function handleModel(event) {
    updateMdodel(event.target.value);
  }

  function handleSort(event) {
    updateSortBy(event.target.value);
  }

  function handleCategory(event) {
    const newCategory = event.target.innerText;
    if (category === newCategory) {
      updateCategory("");
    } else {
      updateCategory(newCategory);
    }
  }

  const unsubscribe = filters.subscribe((value) => {
    ({ search, sortBy, numTokens, model, category } = value);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  .menu-open {
    background-color: black;
    color: white;
  }
</style>

<header
  class="fixed w-full bg-white p-2 border-solid border-b-2 border-indigo-500"
>
  <form on:submit|preventDefault>
    <div class="flex flex-col sm:flex-row w-full align-center items-center justify-between">
      <div class="w-full sm:basis-1/2 border-b-2 border-black">
        <label for="search">
          <input
            class="p-2 w-full"
            type="text"
            placeholder="Search..."
            on:input="{handleSearchInput}"
          />
        </label>
      </div>
      <div class="flex w-full align-center justify-center items-center">
        {#each CATEGORIES as btnCategory }
        <button class="p-2 m-2 bg-black-100 hover:bg-black-900 text-black rounded border-solid border-black border-2" class:menu-open={category === btnCategory} on:click="{handleCategory}">{btnCategory}</button>
        {/each}
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

        <!-- <label for="numTokens">
          Num tokens:
          <select bind:value="{numTokens}" on:change="{handleLimit}">
            {#each NUM_TOKENS as numToken }
            <option value="{numToken}">{numToken}</option>
            {/each}
          </select>
        </label> -->
      </div>
    </div>
    
  </form>
</header>
