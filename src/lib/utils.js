export const calculateTotalLaps = (duration, active, rest) => {
    const totalSeconds = duration * 60;
    const lapDuration = active + rest;
    return Math.floor(totalSeconds / lapDuration);
};

export const calculateTotalTimeRemaining = (duration) => {
    return duration * 60
};
