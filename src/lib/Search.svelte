<script>
  export let onInput;
</script>

<form on:submit|preventDefault>
  <input type="text" placeholder="Search..." on:input="{onInput}" />
</form>
