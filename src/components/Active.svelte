<script>
    import { timerStore } from '../stores/timer.js';
    import { onMount, onDestroy } from 'svelte';

    let interval;

    onMount(() => {
        interval = setInterval(() => {
            timerStore.update(s => {
                if (s.currentPhase !== 'active' || !s.isRunning) {
                    clearInterval(interval);
                    interval = null;
                    return s;
                }

                if (s.timeRemaining > 0) {
                    return { ...s, timeRemaining: s.timeRemaining - 1 };
                } else {
                    clearInterval(interval);
                    interval = null;
                    return {
                        ...s,
                        currentPhase: 'rest',
                        timeRemaining: s.rest
                    };
                }
            });
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="text-center">
    <h1 class="text-[20rem] font-black text-white leading-none">
        {$timerStore.timeRemaining}
    </h1>
    <p class="text-8xl font-black text-white/90 mt-8">GO HARD!</p>
    <div class="mt-12 bg-black/20 rounded-full px-12 py-6 inline-block">
        <p class="text-4xl font-bold text-white/80">
            Lap {$timerStore.currentLap} of {$timerStore.totalLaps}
        </p>
    </div>
</div>