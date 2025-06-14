<script>
    import { timerStore } from '../stores/timer.js';
    import TotalDurationTimer from './TotalDuration.svelte';
    import { onMount, onDestroy } from 'svelte';

    let interval;
    $: fontClass = "text-black";

    onMount(() => {
        timerStore.update(s => {
            return { ...s, backgroundColor: "#10b981" };
        });

        interval = setInterval(() => {
            timerStore.update(s => {
                if (s.currentPhase !== 'rest' || !s.isRunning) {
                    clearInterval(interval);
                    interval = null;
                    return s;
                }

                if (s.timeRemaining > 0) {
                    const newTimeRemaining = s.timeRemaining - 1;
                    const newBackgroundColor = newTimeRemaining <= 5 ? "#FF2800" : s.backgroundColor;
                    fontClass = newTimeRemaining <= 5 ? "text-[#E3E3E3]" : "text-black";

                    return {
                        ...s,
                        timeRemaining: newTimeRemaining,
                        backgroundColor: newBackgroundColor
                    };
                }

                clearInterval(interval);
                interval = null;
                return {
                    ...s,
                    currentPhase: 'active',
                    timeRemaining: s.active,
                    currentLap: s.currentLap + 1
                };
            });
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="text-center">
    <h1 class="text-[20rem] {fontClass} leading-none">
        {$timerStore.timeRemaining}
    </h1>
    <p class="text-8xl font-black text-white/90 mt-8">REST</p>
    <div class="mt-12 bg-black/20 rounded-full px-12 py-6 inline-block">
        <p class="text-4xl font-bold text-white/80">
            Lap {$timerStore.currentLap} of {$timerStore.totalLaps}
        </p>
    </div>
    <TotalDurationTimer />
</div>
