<script>
    import { timerStore } from '../stores/timer.js';
    import { calculateTotalLaps } from '../lib/utils.js';

    let duration = 0;
    let active = 0;
    let rest = 0;
    let currentStep = 1;

    $: currentStep = $timerStore.currentStep;

    const nextStep = () => {
        if (currentStep === 1 && duration > 0) {
            timerStore.update(s => ({ ...s, duration, currentStep: 2 }));
        } else if (currentStep === 2 && active > 0) {
            timerStore.update(s => ({ ...s, active, currentStep: 3 }));
        } else if (currentStep === 3 && rest > 0) {
            const totalLaps = calculateTotalLaps(duration, active, rest);
            timerStore.update(s => ({
                ...s,
                rest,
                currentStep: 4,
                totalLaps,
                totalTimeRemaining: duration * 60
            }));
        }
    };

    const startTimer = () => {
        timerStore.update(s => ({
            ...s,
            isRunning: true,
            currentPhase: 'countdown',
            timeRemaining: 3,
            currentLap: 1,
            shouldFlash: true,
            flashColor: 'green',
            backgroundColor: 'default'
        }));
    };

    const startOver = () => {
        duration = 0;
        active = 0;
        rest = 0;
        timerStore.set({
            duration: 0,
            active: 0,
            rest: 0,
            currentStep: 1,
            isRunning: false,
            currentPhase: 'idle',
            timeRemaining: 0,
            totalTimeRemaining: 0,
            currentLap: 0,
            totalLaps: 0,
            shouldFlash: false,
            flashColor: 'green',
            backgroundColor: 'default'
        });
    };

    const isCurrentStepValid = () => {
        if (currentStep === 1) return duration > 0;
        if (currentStep === 2) return active > 0;
        if (currentStep === 3) return rest > 0;
        return true;
    };
</script>

<!-- Added flex container to center vertically and horizontally -->
<div class="flex items-center justify-center min-h-screen bg-[#161616]"> <!-- CHANGED: Added Mercedes dark bg -->
    <div class="w-[500px] bg-[#232323]/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-[#E3E3E3]/10">
        <!-- CHANGED: Mercedes dark bg and border -->
        {#if currentStep === 1}
        <div class="text-center">
            <h2 class="text-4xl font-black text-[#E3E3E3] mb-4"> <!-- CHANGED: Mercedes light text -->
                Duration
            </h2>
            <p class="text-lg text-[#E3E3E3]/70 mb-8"> <!-- CHANGED -->
                How many minutes?
            </p>

            <div class="mb-8">
                <input type="number" bind:value={duration} min="1" max="60"
                    class="w-full text-6xl font-black text-center bg-[#E3E3E3]/10 border-2 border-[#E3E3E3]/20 rounded-2xl py-4 text-[#E3E3E3] placeholder-[#E3E3E3]/30 focus:border-[#E3E3E3]/50 focus:bg-[#E3E3E3]/20 transition-all duration-300"
                    on:click={(e) => e.target.select()}
                    placeholder="0" /> <!-- CHANGED: bg, border, text, placeholder -->
                <p class="text-[#E3E3E3]/50 mt-2 text-md font-medium"> <!-- CHANGED -->
                    minutes
                </p>
            </div>

            <button on:click={nextStep} disabled={!isCurrentStepValid()}
                class="px-8 py-4 bg-gradient-to-r from-[#0EAD69] to-[#1E8E3E] hover:from-[#0EAD69]/80 hover:to-[#1E8E3E]/80 disabled:from-[#232323] disabled:to-[#232323] disabled:cursor-not-allowed rounded-2xl font-bold text-xl text-[#E3E3E3] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100">
                <!-- CHANGED: Mercedes green, text -->
                NEXT →
            </button>
        </div>
        {/if}

        {#if currentStep === 2}
        <div class="text-center">
            <h2 class="text-4xl font-black text-[#E3E3E3] mb-4">
                Active
            </h2>
            <p class="text-lg text-[#E3E3E3]/70 mb-8">
                Work time in seconds
            </p>

            <div class="mb-8">
                <input type="number" bind:value={active} min="1" max="300"
                    class="w-full text-6xl font-black text-center bg-[#E3E3E3]/10 border-2 border-[#E3E3E3]/20 rounded-2xl py-4 text-[#E3E3E3] placeholder-[#E3E3E3]/30 focus:border-[#E3E3E3]/50 focus:bg-[#E3E3E3]/20 transition-all duration-300"
                    on:click={(e) => e.target.select()}
                    placeholder="0" />
                <p class="text-[#E3E3E3]/50 mt-2 text-md font-medium">
                    seconds
                </p>
            </div>

            <button on:click={nextStep} disabled={!isCurrentStepValid()}
                class="px-8 py-4 bg-gradient-to-r from-[#0EAD69] to-[#1E8E3E] hover:from-[#0EAD69]/80 hover:to-[#1E8E3E]/80 disabled:from-[#232323] disabled:to-[#232323] disabled:cursor-not-allowed rounded-2xl font-bold text-xl text-[#E3E3E3] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100">
                NEXT →
            </button>
        </div>
        {/if}

        {#if currentStep === 3}
        <div class="text-center">
            <h2 class="text-4xl font-black text-[#E3E3E3] mb-4">
                Rest
            </h2>
            <p class="text-lg text-[#E3E3E3]/70 mb-8">
                Recovery time in seconds
            </p>

            <div class="mb-8">
                <input type="number" bind:value={rest} min="1" max="300"
                    class="w-full text-6xl font-black text-center bg-[#E3E3E3]/10 border-2 border-[#E3E3E3]/20 rounded-2xl py-4 text-[#E3E3E3] placeholder-[#E3E3E3]/30 focus:border-[#E3E3E3]/50 focus:bg-[#E3E3E3]/20 transition-all duration-300"
                    on:click={(e) => e.target.select()}
                    placeholder="0" />
                <p class="text-[#E3E3E3]/50 mt-2 text-md font-medium">
                    seconds
                </p>
            </div>

            <button on:click={nextStep} disabled={!isCurrentStepValid()}
                class="px-8 py-4 bg-gradient-to-r from-[#0EAD69] to-[#1E8E3E] hover:from-[#0EAD69]/80 hover:to-[#1E8E3E]/80 disabled:from-[#232323] disabled:to-[#232323] disabled:cursor-not-allowed rounded-2xl font-bold text-xl text-[#E3E3E3] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100">
                NEXT →
            </button>
        </div>
        {/if}

        {#if currentStep === 4}
        <div class="text-center">
            <h2 class="text-4xl font-black text-[#E3E3E3] mb-6">
                Ready to Go!
            </h2>

            <div class="bg-[#E3E3E3]/10 rounded-2xl p-6 mb-8 border border-[#E3E3E3]/20">
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p class="text-[#E3E3E3]/50 text-sm font-medium uppercase">
                            Duration
                        </p>
                        <p class="text-[#E3E3E3] text-2xl font-black mt-1">
                            {$timerStore.duration}m
                        </p>
                    </div>
                    <div>
                        <p class="text-[#E3E3E3]/50 text-sm font-medium uppercase">
                            Active
                        </p>
                        <p class="text-[#E3E3E3] text-2xl font-black mt-1">
                            {$timerStore.active}s
                        </p>
                    </div>
                    <div>
                        <p class="text-[#E3E3E3]/50 text-sm font-medium uppercase">
                            Rest
                        </p>
                        <p class="text-[#E3E3E3] text-2xl font-black mt-1">
                            {$timerStore.rest}s
                        </p>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-[#E3E3E3]/20">
                    <p class="text-[#E3E3E3]/50 text-sm font-medium uppercase">
                        Total Laps
                    </p>
                    <p class="text-[#E3E3E3] text-2xl font-black mt-1">
                        {$timerStore.totalLaps}
                    </p>
                </div>
            </div>

            <button on:click={startTimer}
                class="w-full px-8 py-4 bg-gradient-to-r from-[#0EAD69] to-[#1E8E3E] hover:from-[#0EAD69]/80 hover:to-[#1E8E3E]/80 rounded-2xl font-black text-2xl text-[#E3E3E3] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                START WORKOUT
            </button>

            <button on:click={startOver}
                class="mt-4 w-full px-8 py-4 bg-gradient-to-r from-[#E3001A] to-[#A3000F] hover:from-[#E3001A]/80 hover:to-[#A3000F]/80 rounded-2xl font-bold text-lg text-[#E3E3E3] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                START OVER
            </button>
        </div>
        {/if}
    </div>
</div>
