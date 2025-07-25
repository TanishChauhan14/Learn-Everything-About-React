import { useCallback, useEffect, useState } from "react";

const App = () => {
  const [allowednum, SetAllowednum] = useState(false);

  const [allowedchar, SetAllowedchar] = useState(false);

  const [lenght, SetLenght] = useState(8);

  const [password, SetPassword] = useState("");

  // We are using usecallback here because it help to make this function optimize and it save the data cache.Syntax :- useCallback(fn,[dependecies :- which data is saved on this depends]).
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "`~!@#$%^&*(){}[]";

    if (allowednum) str += num;

    if (allowedchar) str += char;

    for (let i = 0; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    SetPassword(pass);
  }, [allowedchar, allowednum, lenght]);

  // useEffect is use to control rendering in this we are controlling rendring for the passgenerator function.

  useEffect(() => {
    passwordgenerator();
  }, [allowedchar, allowednum, lenght,passwordgenerator]);

  return (
    <div className=" bg-gray-950 h-screen flex flex-col items-center p-7">
      <div className="bg-gray-500 py-2 px-4 flex flex-col justify-center gap-2 w-1/2 rounded-2xl">
        <h1 className="text-center text-4xl font-bold text-white">
          Password Generator
        </h1>
        <div className="py-2 px-4 flex flex-row justify-center gap-8">
          <input
            type="text"
            placeholder="Password Generator"
            className="bg-white py-3 px-8 rounded-2xl"
            value={password}
          />
          <button className=" bg-sky-600 text-white font-bold px-3 py-1.5 rounded-2xl cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex justify-center items-center gap-1">
          <input type="range" name="range" value={lenght} min={8} max={20} className=" cursor-pointer" onChange={(e) => {SetLenght(e.target.value)}} />
          <label htmlFor="range">length:- {lenght}</label>

          <input type="checkbox" name="num" onChange={(e) => {SetAllowednum(e.target.checked)}} />
          <label htmlFor="num">Numbers</label>

          <input type="checkbox" name="char" onChange={(e) => {SetAllowedchar(e.target.checked)}} />
          <label htmlFor="char">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
