<script>
  import { timerStore } from './stores/timer.js';
  import InputForm from './components/InputForm.svelte';
  import Timer from './components/Timer.svelte';

  $: isRunning = $timerStore.isRunning;
  $: backgroundColor = $timerStore.backgroundColor;
  $: shouldFlash = $timerStore.shouldFlash;
  $: flashColor = $timerStore.flashColor;

  let flashState = false;
  let flashInterval;

  $: if (shouldFlash) {
    flashInterval = setInterval(() => {
      flashState = !flashState;
    }, 500);
  } else {
    clearInterval(flashInterval);
    flashState = false;
  }

  // CHANGED: Use actual color values instead of Tailwind classes
  $: bgColorValue = backgroundColor === 'red' ? '#ef4444' :
    backgroundColor === 'blue' ? '#3b82f6' :
      backgroundColor === 'default' ? '#1A1A1A' : '#1A1A1A';

  $: currentBg = shouldFlash && flashState ?
    (flashColor === 'green' ? '#10b981' :
      flashColor === 'red' ? '#ef4444' : '#ffffff') : bgColorValue;
</script>

<!-- CHANGED: Use style attribute for background color -->
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
