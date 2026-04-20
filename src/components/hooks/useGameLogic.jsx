import { useState, useRef, useCallback, useEffect } from "react";
import { generatePositions, formatTime } from "../utils/generatePositions";

// States: idle | playing | gameover | cleared
export function useGameLogic(boardRef) {
  const [inputPoints, setInputPoints] = useState("10");
  const [gameState, setGameState] = useState("idle");
  const [circles, setCircles] = useState([]);
  const [nextExpected, setNextExpected] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [wrongId, setWrongId] = useState(null);
  const [autoplay, setAutoplay] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const autoplayRef = useRef(null);
  const circlesRef = useRef([]);
  const nextExpectedRef = useRef(1);
  const gameStateRef = useRef("idle");

  // Keep refs in sync for use inside intervals
  useEffect(() => {
    circlesRef.current = circles;
  }, [circles]);
  useEffect(() => {
    nextExpectedRef.current = nextExpected;
  }, [nextExpected]);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed((Date.now() - startTimeRef.current) / 1000);
    }, 100);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  };

  const spawnCircles = useCallback(
    (count) => {
      const board = boardRef.current;
      if (!board) return;
      const { width, height } = board.getBoundingClientRect();
      const positions = generatePositions(count, width, height);
      const newCircles = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        n: i + 1,
        x: positions[i].x,
        y: positions[i].y,
        state: "visible",
      }));
      setCircles(newCircles);
      circlesRef.current = newCircles;
      setNextExpected(1);
      nextExpectedRef.current = 1;
    },
    [boardRef],
  );

  const clickCircle = useCallback((n) => {
    if (gameStateRef.current !== "playing") return;

    if (n === nextExpectedRef.current) {
      setCircles((prev) =>
        prev.map((c) => (c.n === n ? { ...c, state: "fading" } : c)),
      );
      setTimeout(() => {
        setCircles((prev) => {
          const updated = prev.map((c) =>
            c.n === n ? { ...c, state: "gone" } : c,
          );
          if (updated.filter((c) => c.state !== "gone").length === 0) {
            stopTimer();
            stopAutoplay();
            setElapsed((Date.now() - startTimeRef.current) / 1000);
            setGameState("cleared");
            gameStateRef.current = "cleared";
          }
          return updated;
        });
      }, 350);
      nextExpectedRef.current += 1;
      setNextExpected((prev) => prev + 1);
    } else {
      stopTimer();
      stopAutoplay();
      setWrongId(n);
      setGameState("gameover");
      gameStateRef.current = "gameover";
    }
  }, []);

  const startAutoplayInterval = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (gameStateRef.current !== "playing") {
        stopAutoplay();
        return;
      }
      const next = nextExpectedRef.current;
      const target = circlesRef.current.find(
        (c) => c.n === next && c.state === "visible",
      );
      if (target) clickCircle(target.n);
    }, 600);
  }, [clickCircle]);

  const handleRestart = useCallback(() => {
    stopTimer();
    stopAutoplay();
    const count = Math.max(1, parseInt(inputPoints) || 10);
    setInputPoints(String(count));
    setElapsed(0);
    setWrongId(null);
    setGameState("playing");
    gameStateRef.current = "playing";
    setTimeout(() => {
      spawnCircles(count);
      startTimer();
      if (autoplay) startAutoplayInterval();
    }, 0);
  }, [inputPoints, spawnCircles, autoplay, startAutoplayInterval]);

  const handleCircleClick = useCallback(
    (n) => {
      if (autoplay) return;
      clickCircle(n);
    },
    [autoplay, clickCircle],
  );

  const handleToggleAutoplay = useCallback(() => {
    setAutoplay((prev) => {
      const next = !prev;
      if (next && gameStateRef.current === "playing") startAutoplayInterval();
      else stopAutoplay();
      return next;
    });
  }, [startAutoplayInterval]);

  useEffect(
    () => () => {
      stopTimer();
      stopAutoplay();
    },
    [],
  );

  const displayCircles = circles.filter((c) => c.state !== "gone");

  return {
    // state
    inputPoints,
    setInputPoints,
    gameState,
    displayCircles,
    nextExpected,
    elapsed,
    wrongId,
    autoplay,
    // helpers
    formatTime,
    // handlers
    handleRestart,
    handleCircleClick,
    handleToggleAutoplay,
  };
}
