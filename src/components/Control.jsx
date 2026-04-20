export default function Controls({
  inputPoints,
  onInputChange,
  elapsed,
  gameState,
  autoplay,
  onRestart,
  onToggleAutoplay,
  formatTime,
}) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <div className="flex items-center gap-2">
        <span className="text-sm w-14">Points:</span>
        <input
          type="number"
          min="1"
          max="50"
          value={inputPoints}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={gameState === "playing"}
          className="border border-gray-400 text-sm px-1 h-[22px] w-36 disabled:bg-gray-100 disabled:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm w-14">Time:</span>
        <span className="text-sm">{formatTime(elapsed)}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRestart}
          className="text-sm px-3 h-[24px] bg-gray-100 border border-gray-400 hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
        >
          {gameState === "idle" ? "Play" : "Restart"}
        </button>

        <button
          onClick={onToggleAutoplay}
          className={`text-sm px-3 h-[24px] border cursor-pointer transition-colors ${
            autoplay
              ? "bg-blue-500 border-blue-600 text-white hover:bg-blue-600"
              : "bg-gray-100 border-gray-400 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {autoplay ? "Auto: ON" : "Auto: OFF"}
        </button>
      </div>
    </div>
  );
}
