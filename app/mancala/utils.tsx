export const initialPits = Array(14).fill(null).map((_, index) => {
  if (index === 6 || index === 13) {
    return 0; // Mancala pits
  }
  return 4; // Regular pits
});
