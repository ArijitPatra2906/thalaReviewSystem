"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [windowDimension, setWindowDimension] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  const detectSize = () => {
    if (typeof window !== "undefined") {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", detectSize);
      return () => {
        window.removeEventListener("resize", detectSize);
      };
    }
  }, []);
  const calculateSum = (number: any) => {
    let sum = 0;
    while (number > 0) {
      sum += number % 10;
      number = Math.floor(number / 10);
    }
    return sum;
  };

  const handleSubmit = () => {
    if (!input) {
      alert("Enter something to check");
    } else {
      const inputNumber = parseInt(input);
      if (!isNaN(inputNumber)) {
        const sum = calculateSum(inputNumber);
        if (sum === 7) {
          setText("sumEqualsSeven");
        } else {
          setText("sumNotEqualsSeven");
        }
      } else {
        setText(
          input.length === 7 ? "lengthEqualsSeven" : "lengthNotEqualsSeven"
        );
      }
    }
  };

  const handleReset = () => {
    setText("");
    setInput("");
  };

  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      {(text === "sumEqualsSeven" || text === "lengthEqualsSeven") && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
      )}
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-2">
        <div className="">
          <h4 className="text-center text-xl font-bold pb-4">
            Thala review system😜
          </h4>
          <div className="flex items-center justify-center gap-4">
            <div>
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                value={input}
                id="small-input"
                placeholder="Enter Anything"
                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Check
            </button>
          </div>

          {text === "sumEqualsSeven" || text === "lengthEqualsSeven" ? (
            <div className="my-3">
              <video width="300" autoPlay loop>
                <source src="/assets/thalaa.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h4 className="pt-2 font-bold text-center">
                Thala for a reason🎉
              </h4>
              <button
                onClick={handleReset}
                className="text-white w-full mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset
              </button>
            </div>
          ) : (
            (text === "sumNotEqualsSeven" ||
              text === "lengthNotEqualsSeven") && (
              <div className=" mt-4">
                <audio autoPlay loop>
                  <source src="/assets/moye.mp3" type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <Image src="/assets/gif.gif" alt="" width={300} height={222} />
                <h4 className="pt-2 font-bold text-center">
                  No Thala for You😫
                </h4>

                <button
                  onClick={handleReset}
                  className="text-white w-full mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Reset
                </button>
              </div>
            )
          )}
        </div>

        {/* <div className="text-center pt-2 text-sm font-semibold text-gray-600">
          Made by Arijit Patra😎
        </div> */}
      </div>
    </main>
  );
}
