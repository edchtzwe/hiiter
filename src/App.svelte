<script>
  import { timerStore } from './stores/timer.js';
  import InputForm from './components/InputForm.svelte';
  import Timer from './components/Control.svelte';

  $: isRunning = $timerStore.isRunning;
  $: currentBg = $timerStore.backgroundColor;
</script>

<main class="min-h-screen transition-colors duration-300 flex flex-col items-center justify-between relative"
  style="background-color: {currentBg}">
  {#if !isRunning}
  <InputForm />
  {:else}
  <Timer />
  {/if}

  <footer class="text-xs text-gray-500 text-right w-full p-4">
    <p>
      Created by: ep0ua3lec@mozmail.com <br />
      Written in:
      <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer"
        class="inline-flex items-center hover:underline">
        Svelte
        <svg class="ml-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path fill="#FF3E00"
            d="M12 0a12 12 0 0 0-4.4 23.1c.7.1 1-.3 1-.7v-2.4c-4.1.9-5-2-5-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-1 .1-1 .1-1 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.7 4.3 1.3.1-1 .5-1.7.9-2.1-3.3-.4-6.7-1.7-6.7-7.5 0-1.7.6-3.1 1.5-4.2-.2-.4-.7-2 .1-4.2 0 0 1.2-.4 4.4 1.6a15.3 15.3 0 0 1 8 0c3.1-2 4.4-1.6 4.4-1.6.8 2.2.3 3.8.1 4.2 1 1.1 1.5 2.5 1.5 4.2 0 5.8-3.5 7-6.8 7.4.5.4 1 1.3 1 2.6v3.8c0 .4.3.8 1 .7A12 12 0 0 0 12 0z" />
        </svg>
      </a>
    </p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
