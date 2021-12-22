import { useEffect } from "preact/hooks";

import { CanvasView, startGame } from "./index";

export const Albie = () => {
  useEffect(() => {
    const view = new CanvasView("#playField");
    view.initStartButton(startGame);
  }, []);

  return (
    <div id="main" className="main">
      <canvas id="playField" width="1000" height="600"></canvas>
      <img id="background" className="background" src="/background.png" />
      <div id="display">
        <div id="score"></div>
        <button id="start">Play</button>
        <div id="info">Press play!</div>
      </div>
    </div>
  );
};
