import { useState, useEffect } from "react";
import Title from "./Title";
import Footer from "./Footer";

// wasm will hook into an existing JS canvas in the document calling it, this canvas
// should be called wasmCanvas
const WasmApp = () => {
  // const [dimension, setDimension] = useState(3);

  const [shiftHeld, setShiftHeld] = useState(false);

  addEventListener("keydown", (e) => e.key == "Shift" && setShiftHeld(true));
  addEventListener("keyup", (e) => e.key == "Shift" && setShiftHeld(false));

  useEffect(() => {
    const loadWasm = async () => {
      // Load wasm_exec.js dynamically
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "../../wasm_exec.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      const go = new Go();
      const response = await fetch("/demo.wasm");
      console.log(response);
      const buffer = await response.arrayBuffer();
      const { instance } = await WebAssembly.instantiate(
        buffer,
        go.importObject
      );
      go.run(instance);
    };
    loadWasm();
  }, []);

  return (
    <>
      <div className="h-full w-full lg:flex justify-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-1 w-full h-fit lg:w-11/12 lg:pl-[11rem] md:w-5/6 mx-auto gap-4 ">
          <div className="col-span-1">
            <Title>Rubik's Cube</Title>
            <button
              type="button"
              className="mb-2 fort-semibold text-white bg-stone-900 dark:bg-white dark:text-stone-900 rounded ml-1 pl-2 pr-2"
            >
              <a href="/">Back to homepage</a>
            </button>
            <p className="mb-4">
              A Rubik's Cube which I made in WebAssembly to learn how to render
              3D objects with WebGL. I tried to make it very spam-proof, and to
              do this I made it so animations are queued up and executed
              asynchronously with each other, in such a way that they run in
              parallel where possible, and sequentially when they would
              conflict. Drag on the canvas to rotate the cube, and use the
              buttons or keyboard keys to make a move. Hold Shift to make
              anti-clockwise moves.
            </p>

            <div className="grid grid-cols-6 w-full h-full mx-auto gap-1">
              <div className="col-span-1">
                <div className="aspect-square">
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="u" className="w-full h-full hover:bg-stone-400">
                      U{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="d" className="w-full h-full hover:bg-stone-400">
                      D{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="e" className="w-full h-full hover:bg-stone-400">
                      E{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="aspect-square">
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="r" className="w-full h-full hover:bg-stone-400">
                      R{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="l" className="w-full h-full hover:bg-stone-400">
                      L{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="m" className="w-full h-full hover:bg-stone-400">
                      M{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="aspect-square">
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="f" className="w-full h-full hover:bg-stone-400">
                      F{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="b" className="w-full h-full hover:bg-stone-400">
                      B{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="s" className="w-full h-full hover:bg-stone-400">
                      S{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="aspect-square">
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="x" className="w-full h-full hover:bg-stone-400">
                      x{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="y" className="w-full h-full hover:bg-stone-400">
                      y{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button id="z" className="w-full h-full hover:bg-stone-400">
                      z{shiftHeld ? "'" : ""}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="aspect-square">
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button
                      id="shuffle"
                      className="w-full h-full hover:bg-stone-400"
                    >
                      Shuffle
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button
                      id="reset"
                      className="w-full h-full hover:bg-stone-400"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="w-full h-2/3 mr-1 mb-1 bg-stone-300 dark:bg-stone-500">
                    <button
                      id="reset-camera"
                      className="w-full h-full hover:bg-stone-400"
                    >
                      Reset Camera
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-2 flex-col md:flex-row items-center">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <label className="block md:text-sm text-xs text-stone-900 dark:text-white">
                  Cube dimension
                </label>
                <input
                  id="dimension"
                  onChange={(e) => setDimension(e.target.value)}
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={dimension}
                  className="w-full h-2 mt-1  bg-stone-200 rounded-lg appearance-none cursor-pointer dark:bg-stone-700"
                ></input>
              </div>
            </div> */}
          <div className="lg:col-span-2 lg:max-h-screen">
            <div className="flex flex-col max-h-full aspect-square lg:pt-[5rem] lg:pr-[11rem] lg:pb-[6rem]">
              <canvas
                id="wasm-canvas"
                className="w-100 flex-grow border-4 max-h-full max-w-full overflow-auto border-stone-300 dark:border-stone-600"
              />
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:bottom-0 ">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default WasmApp;
