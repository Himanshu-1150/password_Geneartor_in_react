import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [lenght, setLength] = useState(8);
  const [numcheck, setNumCheck] = useState(false);
  const [charCheck, setCharCheck] = useState(false);
  const [password, setPassword] = useState("password");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numcheck) str += "1234567890";
    if (charCheck) str += "!@#$%^&*()_-<>?/~";
    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [lenght, numcheck, charCheck, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenrator();
  }, [numcheck, charCheck, lenght, passwordGenrator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 py-5">
        <h1 className="text-center text-white my-2">password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-300 p-2 text-center hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-slate-800 text-1xl"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div>
            <input
              type="range"
              id="range"
              min={6}
              max={100}
              value={lenght}
              className="cursor-pointer "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range"> Length: {lenght}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numcheck}
              id="numberInput"
              onChange={() => {
                setNumCheck((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charCheck}
              id="charInput"
              onChange={() => {
                setCharCheck((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
