<script>
  import { timerStore } from './stores/timer.js';
  import InputForm from './components/InputForm.svelte';
  import Timer from './components/Control.svelte';

  $: isRunning = $timerStore.isRunning;
  $: currentBg = $timerStore.backgroundColor;
</script>

<main class="min-h-screen transition-colors duration-300 flex items-center justify-center"
  style="background-color: {currentBg}">
  {#if !isRunning}
  <InputForm />
  {:else}
  <Timer />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
