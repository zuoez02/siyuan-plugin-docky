<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  const dispatchEvent = createEventDispatcher();

  let icons: string[] = [];

  onMount(() => {
    const symbols = document.querySelectorAll("body > svg symbol");
    icons = [...symbols].map((s) => s.id);
  });
</script>

<div class="icon">
  {#each icons as icon}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg
      style="width: 14px; height: 14px; padding: 4px;"
      class="b3-tooltips b3-tooltips__sw"
      aria-label={icon}
      on:click={() => dispatchEvent('copy', icon)}><use xlink:href={"#" + icon}></use></svg
    >
  {/each}
</div>
