<script>
    import { timerStore } from '../stores/timer.js';
    import Countdown from './Countdown.svelte';
    import Active from './Active.svelte';
    import Rest from './Rest.svelte';

    $: currentPhase = $timerStore.currentPhase;
</script>

<div class="flex items-center justify-center min-h-screen">
    {#if currentPhase === 'countdown'}
        <Countdown />
    {:else if currentPhase === 'active'}
        <Active />
    {:else if currentPhase === 'rest'}
        <Rest />
    {/if}
</div>
