import { useRef } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import Controls from "./Control";
import Board from "./Board";

export default function Game() {
  const boardRef = useRef(null);
  const {
    inputPoints,
    setInputPoints,
    gameState,
    displayCircles,
    nextExpected,
    elapsed,
    wrongId,
    autoplay,
    formatTime,
    handleRestart,
    handleCircleClick,
    handleToggleAutoplay,
  } = useGameLogic(boardRef);

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 font-sans">
      <div className="w-full max-w-[480px] border border-gray-400 p-3">
        <div className="text-sm font-bold mb-2">LET'S PLAY</div>

        <Controls
          inputPoints={inputPoints}
          onInputChange={setInputPoints}
          elapsed={elapsed}
          gameState={gameState}
          autoplay={autoplay}
          onRestart={handleRestart}
          onToggleAutoplay={handleToggleAutoplay}
          formatTime={formatTime}
        />

        <Board
          ref={boardRef}
          displayCircles={displayCircles}
          nextExpected={nextExpected}
          wrongId={wrongId}
          gameState={gameState}
          elapsed={elapsed}
          formatTime={formatTime}
          onCircleClick={handleCircleClick}
          onRestart={handleRestart}
        />
      </div>
    </div>
  );
}
