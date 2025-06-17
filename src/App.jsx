import { useCallback, useEffect, useState, useRef } from 'react'
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copyText, setCopyText] = useState('Copy');
  const [btnBG, setBtnBG] = useState('#2563EB')

  const passwordRef = useRef(null); // can be used to grab a reference of the input field (password)

  const copyPsdToClpBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.style.color = '#60A5FA';
    setCopyText('Copied');
    setBtnBG('#1D4ED8');
  }

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numberAllowed) {
      str = str + '0123456789';
    }

    if(specialCharAllowed) {
      str = str + '!@#$%^&*()_+';
    }
    
    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(index);     
    }
    
    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, specialCharAllowed]);

  return (
    <div className='w-full min-h-screen flex justify-between items-center'>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-5 py-3 my-8 
        bg-gray-700 text-blue-400'>
        <h1 className='text-white text-3xl text-center my-3 mb-8'>Password Generator</h1>
        <div className='flex shadow gap-3 overflow-hidden mb-4'>
          <input type="text" 
            value={password}
            className='outline-none w-full py-1 px-3 rounded-lg bg-white text-black'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none text-white rounded-lg w-[80px] px-3 py-0.5 shrink-0'
            onClick={copyPsdToClpBoard}
            style={{backgroundColor: btnBG}}
          >{copyText}</button>
        </div>
        <div className='flex text-md justify-between'>
          <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(ev) => setLength(ev.target.value)}
          />
          <label htmlFor="length">Lenght : {length}</label>
          <div className='flex text-sm gap-x-2'>
            <input type="checkbox"
            defaultChecked = {numberAllowed}
            onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
          </div>
          <label htmlFor="number">Numbers</label>
          <div className='flex text-sm gap-x-2'>
            <input type="checkbox"
            defaultChecked = {specialCharAllowed}
            onChange={() => {setSpecialCharAllowed((prev) => !prev)}}
            />
          </div>
          <label htmlFor="chars">Special Characters</label>
        </div>
      </div>

    </div>
  )
}

export default App
