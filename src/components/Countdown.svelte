<script>
    import { timerStore } from '../stores/timer.js';
    import { onDestroy } from 'svelte';
  
    let interval;
  
    $: time = $timerStore.timeRemaining;
  
    // Start countdown on mount
    $: if ($timerStore.currentPhase === 'countdown' && $timerStore.isRunning) {
      if (!interval) {
        interval = setInterval(() => {
          timerStore.update(s => {
            if (s.timeRemaining > 0) {
              return { ...s, timeRemaining: s.timeRemaining - 1 };
            } else {
              // Transition to next phase, e.g., 'active'
              return { ...s, currentPhase: 'active', timeRemaining: s.active };
            }
          });
        }, 1000);
      }
    } else {
      clearInterval(interval);
      interval = null;
    }
  
    onDestroy(() => {
      clearInterval(interval);
    });
  </script>
  
  <h1>{time}</h1>
  