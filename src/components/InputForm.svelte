<script>
  import { timerStore } from "../stores/timer.js";
  import { calculateTotalLaps } from "../lib/utils.js";

  import DurationStep from "./DurationStep.svelte";
  import ActiveStep from "./ActiveStep.svelte";
  import RestStep from "./RestStep.svelte";
  import SummaryStep from "./SummaryStep.svelte";

  let duration = 0;
  let active = 0;
  let rest = 0;
  let currentStep = 1;

  $: currentStep = $timerStore.currentStep;

  const nextStep = () => {
    const stepActions = [
      {
        condition: () => currentStep === 1 && duration > 0,
        update: () =>
          timerStore.update((s) => ({ ...s, duration, currentStep: 2 })),
      },
      {
        condition: () => currentStep === 2 && active > 0,
        update: () =>
          timerStore.update((s) => ({ ...s, active, currentStep: 3 })),
      },
      {
        condition: () => currentStep === 3 && rest > 0,
        update: () => {
          const totalLaps = calculateTotalLaps(duration, active, rest);
          timerStore.update((s) => ({
            ...s,
            rest,
            currentStep: 4,
            totalLaps,
            totalTimeRemaining: duration * 60,
          }));
        },
      },
    ];

    const action = stepActions.find((a) => a.condition());
    if (!action) {
      throw new Error("No valid step action found.");
    }

    action.update();
  };

  /**
   * @TODO Put these into lib
   */
  const startTimer = () => {
    timerStore.update((s) => ({
      ...s,
      isRunning: true,
      currentPhase: "countdown",
      timeRemaining: 5,
      currentLap: 1,
      backgroundColor: "default",
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
      currentPhase: "idle",
      timeRemaining: 0,
      totalTimeRemaining: 0,
      currentLap: 0,
      totalLaps: 0,
      backgroundColor: "#1A1A1A",
    });
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return duration > 0;
      case 2:
        return active > 0;
      case 3:
        return rest > 0;
      default:
        return true;
    }
  };
</script>

<div class="flex items-center justify-center min-h-screen bg-[#161616]">
  <div class="w-[500px] bg-[#232323]/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-[#E3E3E3]/10">
    {#if currentStep === 1}
      <DurationStep bind:duration {nextStep} {isCurrentStepValid} />
    {:else if currentStep === 2}
      <ActiveStep bind:active {nextStep} {isCurrentStepValid} />
    {:else if currentStep === 3}
      <RestStep bind:rest {nextStep} {isCurrentStepValid} />
    {:else if currentStep === 4}
      <SummaryStep {startTimer} {startOver} />
    {/if}
  </div>
</div>
