<script>
    import { timerStore } from '../stores/timer.js';
    import { onMount, onDestroy } from 'svelte';

    let interval;

    onMount(() => {
        interval = setInterval(() => {
            timerStore.update(s => {
                if (!s.isRunning) {
                    clearInterval(interval);
                    interval = null;
                    return s;
                }

                if (s.totalTimeRemaining > 0) {
                    return { ...s, totalTimeRemaining: s.totalTimeRemaining - 1 };
                }

                clearInterval(interval);
                interval = null;

                return {
                    ...s,
                    isRunning: false,
                    backgroundColor: '#FF5800',
                    duration: s.duration,
                    active: s.active,
                    rest: s.rest,
                    totalTimeRemaining: s.duration * 60
                };
            });
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<p class="text-2xl font-bold text-white/60 mt-4">
    Total Time Left: {Math.floor($timerStore.totalTimeRemaining / 60)}:{($timerStore.totalTimeRemaining % 60).toString().padStart(2, '0')}
</p>
