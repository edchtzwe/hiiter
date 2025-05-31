export const calculateTotalLaps = (duration, active, rest) => {
    const totalSeconds = duration * 60;
    const lapDuration = active + rest;
    return Math.floor(totalSeconds / lapDuration);
};

export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
