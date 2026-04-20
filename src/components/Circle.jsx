export default function Circle({
  circle,
  isNext,
  isWrong,
  gameState,
  onClick,
}) {
  const base =
    "absolute w-[52px] h-[52px] rounded-full border bg-white text-sm font-medium flex items-center justify-center cursor-pointer transition-all duration-300 select-none";

  let className = base;
  if (circle.state === "fading") {
    className +=
      " opacity-0 scale-50 pointer-events-none border-gray-400 text-gray-700";
  } else if (isWrong) {
    className += " border-red-500 text-red-500 animate-shake";
  } else if (isNext && gameState === "playing") {
    className += " border-red-400 text-red-400";
  } else {
    className += " border-gray-400 text-gray-700 hover:bg-gray-50";
  }

  return (
    <button
      className={className}
      style={{ left: circle.x, top: circle.y }}
      onClick={() => onClick(circle.n)}
    >
      {circle.n}
    </button>
  );
}
