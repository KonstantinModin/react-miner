export const GameState = {
  Active: "active",
  Won: "won",
  Lost: "lost",
};

export const gameStateMessages = {
  [GameState.Won]: { label: "You win!", color: "green" },
  [GameState.Lost]: { label: "You lost!", color: "red" },
};
