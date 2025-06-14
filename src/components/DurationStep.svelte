<script>
    export let duration;
    export let nextStep;
    export let isCurrentStepValid;
</script>

<div class="text-center">
    <h2 class="text-4xl font-black text-[#E3E3E3] mb-4">
        Duration
    </h2>
    <p class="text-lg text-[#E3E3E3]/70 mb-8">
        How many minutes?
    </p>

    <div class="mb-8">
        <input type="number" bind:value={duration} min="1" max="60"
            class="w-full text-6xl font-black text-center bg-[#E3E3E3]/10 border-2 border-[#E3E3E3]/20 rounded-2xl py-4 text-[#E3E3E3] placeholder-[#E3E3E3]/30 focus:border-[#E3E3E3]/50 focus:bg-[#E3E3E3]/20 transition-all duration-300"
            on:click={(e)=> e.target.select()}
        placeholder="0" />
        <p class="text-[#E3E3E3]/50 mt-2 text-md font-medium">
            minutes
        </p>
    </div>

    <button on:click={nextStep} disabled={!isCurrentStepValid()}
        class="px-8 py-4 bg-gradient-to-r from-[#0EAD69] to-[#1E8E3E] hover:from-[#0EAD69]/80 hover:to-[#1E8E3E]/80 disabled:from-[#232323] disabled:to-[#232323] disabled:cursor-not-allowed rounded-2xl font-bold text-xl text-[#E3E3E3] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100">
        NEXT →
    </button>
</div>
