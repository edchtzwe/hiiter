import { writable } from 'svelte/store';

export const timerStore = writable({
    duration: 0,        // minutes
    active: 0,          // seconds
    rest: 0,            // seconds
    currentStep: 1,     // 1=duration, 2=active, 3=rest, 4=ready

    isRunning: false,
    currentPhase: 'idle', // 'idle', 'countdown', 'active', 'rest'
    timeRemaining: 0,     // seconds

    currentLap: 0,
    totalLaps: 0,

    totalTimeRemaining: 0, // total duration countdown in seconds

    backgroundColor: '#1A1A1A'
});
