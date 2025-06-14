<script>
    import { timerStore } from '../stores/timer.js';
    export let startTimer;
    export let startOver;
</script>

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
