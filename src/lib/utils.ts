export const calculateSleepDuration = (start: string, end: string): number => {
  if (!start || !end) return 0;
  const startDt = new Date(start);
  const endDt = new Date(end);

  let diffInMs = endDt.getTime() - startDt.getTime();
  // If wake time is earlier than bedtime (e.g. 11pm to 7am), add 24 hours
  if (diffInMs < 0) {
    diffInMs += 24 * 60 * 60 * 1000;
  }

  const hours = diffInMs / (1000 * 60 * 60);
  return Math.round(hours * 10) / 10; // Round to nearest half hour
};

export const formatDate = (dateString: string) => {
  return new Date(dateString + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};
