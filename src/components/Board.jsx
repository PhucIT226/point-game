import { forwardRef } from "react";
import Circle from "./Circle";
import Overlay from "./Overlay";

const Board = forwardRef(function Board(
  {
    displayCircles,
    nextExpected,
    wrongId,
    gameState,
    elapsed,
    formatTime,
    onCircleClick,
    onRestart,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className="relative w-full h-[440px] border border-gray-400 bg-white overflow-hidden"
    >
      {displayCircles.map((c) => (
        <Circle
          key={c.id}
          circle={c}
          isNext={c.n === nextExpected}
          isWrong={wrongId === c.n}
          gameState={gameState}
          onClick={onCircleClick}
        />
      ))}

      <Overlay
        gameState={gameState}
        elapsed={elapsed}
        formatTime={formatTime}
        onRestart={onRestart}
      />
    </div>
  );
});

export default Board;
