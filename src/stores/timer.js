// src/stores/timer.js
import { writable } from 'svelte/store';

export const timerStore = writable({
    // User input
    duration: 0,        // minutes
    active: 0,          // seconds
    rest: 0,            // seconds
    currentStep: 1,     // 1=duration, 2=active, 3=rest, 4=ready

    // Timer state
    isRunning: false,
    currentPhase: 'idle', // 'idle', 'countdown', 'active', 'rest'
    timeRemaining: 0,     // seconds

    // Lap state
    currentLap: 0,
    totalLaps: 0,

    // Visual state
    backgroundColor: 'default' // 'default', 'red', 'blue'
});