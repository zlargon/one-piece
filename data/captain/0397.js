export default function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] !== 'perfect' ? sum + 1 : 0;
    if (sum >= 5) return 3;
  }

  return 1;
}
