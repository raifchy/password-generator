import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+= []{}~`";

    let pass = "";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const copyPass = () => {
    passRef.current?.select();

    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className=" mx-auto my-8 w-full max-w-lg rounded-md border-2 border-solid border-green-600 bg-green-200 p-3  px-4 text-center font-mono font-semibold text-green-700 shadow-md">
        <h1 className="mb-4 text-2xl">Password Generator</h1>

        <div className="mb-4 flex overflow-hidden rounded-sm shadow-md">
          <input
            value={password}
            className="w-full px-3 py-1 outline-none"
            readOnly
            ref={passRef}
          />

          <button
            onClick={copyPass}
            className="bg-green-700 text-white px-3 hover:bg-green-600"
          >
            copy
          </button>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min="4"
              max="40"
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={(prev) => setNumberAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}
