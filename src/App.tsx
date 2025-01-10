import { useState } from "react";
import "./App.css";

export default function App() {
  // data (initial Array)
  const initArr = [
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [3, 4],
    [1, 2],
  ];

  // useState of array
  const [arr, setArr] = useState<number[][]>(initArr);
  const [input, setInput] = useState<string>("");

  //check a duplicate
  const detectDupe = () => {
    const counts: Record<string, number> = {};

    arr.forEach((pair) => {
      const key = JSON.stringify(pair);
      counts[key] = (counts[key] || 0) + 1;
    });

    const dupe = Object.values(counts).filter((count) => count > 1).length;

    return dupe;
  };

  //add then remove
  const removeInput = () => {
    if (input === "") return;

    const updatedArray = arr.filter(
      (pair) => pair[0] + pair[1] !== Number(input)
    );

    setArr(updatedArray);
  };

  //reset function
  const resetArr = () => {
    setArr([...initArr]);
  };

  //flipping function
  const flipArr = () => {
    const flippy = arr.map((pair) => [pair[1], pair[0]]);
    setArr(flippy);
  };

  //Dupe Removal function
  const removeDupe = () => {
    const unique = Array.from(
      new Set(arr.map((pair) => JSON.stringify(pair)))
    ).map((item) => JSON.parse(item));
    setArr(unique);
  };

  //ascending & descending function
  const sortArr = (order: "asc" | "desc") => {
    const sortie = [...arr].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      return order === "asc" ? sumA - sumB : sumB - sumA;
    });
    setArr(sortie);
  };

  const dupes = detectDupe();

  return (
    <main>
      {/* main container start */}
      <div className="w-full md:w-[75%] lg:w-[50%] mx-auto">
        <h1 className="text-2xl text-red-500 text-center">Domino!</h1>

        {/* Source container start*/}
        <div className="border border-zinc-700 bg-blue-200 my-3 px-1 text-center">
          <h1 className="font-bold">Source</h1>
          <p>{JSON.stringify(arr)}</p>
        </div>
        {/* Source container end*/}

        {/* Double number start */}
        <div className="border border-zinc-700 bg-blue-200 my-3 px-1 text-center">
          <h1 className="font-bold">Double Numbers</h1>
          <p>{dupes > 0 ? `${dupes}` : 0}</p>
        </div>
        {/* Double number end */}

        {/* Card container start*/}
        <div className="flex justify-center my-5">
          {/* every pair in array will be displayed here */}
          {arr.map((pair, index) => {
            // Check if the pair is a duplicate
            const pairKey = JSON.stringify(pair);
            const isDuplicate =
              arr.filter((p) => JSON.stringify(p) === pairKey).length > 1;

            return (
              <div key={index} className="flex flex-col">
                {pair.map((num, i) => (
                  <h1
                    key={i}
                    className={`p-2 my-1 mx-2 ${
                      isDuplicate ? "bg-red-500 text-white" : "bg-zinc-200"
                    }`}
                  >
                    {num}
                  </h1>
                ))}
              </div>
            );
          })}
        </div>
        {/* Card container end*/}

        {/* domino card function start */}
        <div className="my-2 mx-auto">
          {/* Ascending Button */}
          <button
            className="bg-blue-400 text-white p-2 mr-2 rounded-xl"
            onClick={() => sortArr("asc")}
          >
            Sort (ASC)
          </button>
          {/* Descending Button */}
          <button
            className="bg-blue-400 text-white p-2 mr-2 rounded-xl"
            onClick={() => sortArr("desc")}
          >
            Sort (DESC)
          </button>
          {/* Flipping Button */}
          <button
            className="bg-blue-400 text-white p-2 mr-2 rounded-xl"
            onClick={flipArr}
          >
            Flip
          </button>
          {/* Duplication Removal */}
          <button
            className="bg-blue-400 text-white p-2 mr-2 rounded-xl"
            onClick={removeDupe}
          >
            Remove Dup
          </button>
          {/* Reset Button */}
          <button
            className="bg-blue-400 text-white p-2 mr-2 rounded-xl"
            onClick={resetArr}
          >
            Reset
          </button>

          {/* Input Start */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              removeInput();
            }}
          >
            <input
              type="text"
              className="border border-zinc-600 my-3 p-1"
              placeholder="Input Number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="mx-2 p-1 bg-blue-400 text-white rounded-lg">
              Remove Input
            </button>
          </form>
          {/* Input End = */}
        </div>
        {/* domino card function end */}
      </div>
      {/* main container end */}
    </main>
  );
}
