// src/stores/timer.js
import { writable } from 'svelte/store';

export const timerStore = writable({
    // User input
    duration: 0,      // minutes
    active: 0,        // seconds
    rest: 0,          // seconds
    currentStep: 1,   // 1=duration, 2=active, 3=rest, 4=ready

    // Countdown state
    isRunning: false,
    timeRemaining: 0  // seconds, for countdown
});