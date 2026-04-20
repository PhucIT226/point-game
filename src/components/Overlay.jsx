export default function Overlay({ gameState, elapsed, formatTime, onRestart }) {
  if (gameState === "idle") {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
        Press <strong className="mx-1">Play</strong> to start
      </div>
    );
  }

  if (gameState === "gameover") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white">
        <div className="text-2xl font-bold text-red-600 tracking-wide">
          GAME OVER
        </div>
        <div className="text-sm text-gray-500">
          You clicked the wrong number!
        </div>
        <div className="text-lg text-gray-700">{formatTime(elapsed)}</div>
        <button
          onClick={onRestart}
          className="text-sm px-4 h-[26px] bg-gray-100 border border-gray-400 hover:bg-gray-200 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (gameState === "cleared") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white">
        <div className="text-2xl font-bold text-gray-800 tracking-wide">
          ALL CLEARED
        </div>
        <div className="text-lg text-gray-700">{formatTime(elapsed)}</div>
        <button
          onClick={onRestart}
          className="text-sm px-4 h-[26px] bg-gray-100 border border-gray-400 hover:bg-gray-200 cursor-pointer"
        >
          Play Again
        </button>
      </div>
    );
  }

  return null;
}
