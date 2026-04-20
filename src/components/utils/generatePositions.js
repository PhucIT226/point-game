const CIRCLE_SIZE = 52;
const BOARD_PADDING = 20;

export function generatePositions(count, boardW, boardH) {
  const positions = [];
  const maxTries = 300;
  for (let i = 0; i < count; i++) {
    let pos,
      tries = 0;
    do {
      pos = {
        x:
          BOARD_PADDING +
          Math.random() * (boardW - CIRCLE_SIZE - BOARD_PADDING * 2),
        y:
          BOARD_PADDING +
          Math.random() * (boardH - CIRCLE_SIZE - BOARD_PADDING * 2),
      };
      tries++;
    } while (
      tries < maxTries &&
      positions.some(
        (p) => Math.hypot(p.x - pos.x, p.y - pos.y) < CIRCLE_SIZE + 12,
      )
    );
    positions.push(pos);
  }
  return positions;
}

export const CIRCLE_SIZE_PX = CIRCLE_SIZE;

export function formatTime(t) {
  return t.toFixed(1) + "s";
}
