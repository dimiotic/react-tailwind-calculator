import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { IBtn, btns } from './btns';
const App = () => {
  const [inputValue, setInputValue] = useState('0');
  const [num1, setNum1] = useState('');
  const [sign, setSign] = useState('');
  const [num2, setNum2] = useState('');
  const [clicked, setClicked] = useState(false);
  const [touchstartX, setTouchstartX] = useState(0);
  const getResult = useCallback(
    (num1: string, num2: string) => {
      const number1 = Number(num1.replace(/,/gi, '.'));
      const number2 = Number(num2.replace(/,/gi, '.'));
      return String(
        sign === '+'
          ? number1 + number2
          : sign === '-'
          ? number1 - number2
          : sign === '×'
          ? number1 * number2
          : sign === '÷'
          ? number1 / number2
          : number1
      );
    },
    [sign]
  );

  const handleClick = (value: string, type: string) => {
    if (type === 'number') {
      setClicked(true);
      setInputValue((prev) => prev + value);
      if (num1 && num2) {
        setNum1('');
        setNum2('');
        setSign('');
      }
    }

    if (type === 'number' && (inputValue === '-0' || inputValue === '0')) {
      setInputValue(value);
      if (num1) setClicked(true);
    }
    if (inputValue === '0' && value === ',') {
      setInputValue('0,');
    }
    if (num1 && num2 && !clicked && type === 'number') setInputValue(value);
    if (value === '=' && num1) {
      setNum2(inputValue);
    }
    if (num1 === inputValue && !clicked) {
      setInputValue(value);
    }

    if (type === 'action') {
      if (value === '=') return;
      if (!sign) {
        setSign(value);
      }
      setClicked(false);
      if (num1 && !num2) {
        setInputValue('0');
        const result = getResult(num1, inputValue);
        setNum1(result);
        setSign(value);
      }
      if (num1 && num2) {
        const result = getResult(num1, num2);
        setNum1(result);
        setSign(value);

        setNum2('');
      }
      if (!num1) {
        setNum1(inputValue);
        setSign(value);
      }
    }
    if (value === '%') {
      if (!num1) setInputValue((prev) => String(Number(prev) / 100));
      if (num1)
        setInputValue((prev) => String((Number(num1) / 100) * Number(prev)));
    }
    if (type === 'spec') {
      if (value === 'AC') {
        setNum1('');
        setNum2('');
        setSign('');
        setInputValue('0');
      }
      if (value === 'C') {
        setInputValue('0');
      }
      if (value === '±') {
        setInputValue((prev) =>
          prev[0] === '-' ? prev.substring(1) : '-' + prev
        );
      }
    }
  };
  const deleteSlide = (touchend: number) => {
    if (touchstartX - touchend > 150) {
      setInputValue((value) => value.substring(0, value.length - 1));
    }
  };
  useEffect(() => {
    if (num1 && num2 && inputValue !== '0') {
      const result = getResult(num1, num2);
      setInputValue(String(result));
    }
    if (inputValue.length <= 0 || inputValue === '-') setInputValue('0');
  }, [num2, getResult, inputValue, num1]);
  return (
    <main
      onTouchStart={(e) => setTouchstartX(e.changedTouches[0].screenX)}
      onTouchEnd={(e) => {
        deleteSlide(e.changedTouches[0].screenX);
      }}
      style={{ borderRadius: 23 }}
      className="m-5 p-8 pt-44 overflow-hidden bg-black w-6/12"
    >
      <div style={{ position: 'relative' }} className="m-3">
        <p
          style={{ position: 'absolute', top: -20 }}
          className="flex w-11/12  justify-end  text-xl text-gray-500"
        >
          {num1} {sign} {num2} {num1 && num2 && '='}
        </p>
        <input
          className="flex bg-black w-11/12 text-end text-6xl outline-none"
          value={inputValue}
          onChange={(e) =>
            setInputValue(e.target.value.replace(/[^0-9,]/gi, ''))
          }
        />
      </div>
      <div className="grid grid-cols-4 ">
        {btns.map((item: IBtn): ReactElement => {
          let { value, type } = item;
          value = value === 'AC' && num1 ? 'C' : value;
          value = inputValue === '0' && value === 'C' ? 'AC' : value;
          return (
            <button
              onClick={() => handleClick(value, type)}
              key={value}
              className={`m-2 text-4xl rounded-full w-20 h-20 ${
                type === 'spec'
                  ? 'bg-gray-400 text-black'
                  : type === 'action'
                  ? 'bg-amber-500'
                  : type === 'number'
                  ? 'bg-zinc-800'
                  : 'bg-zinc-800 pointer-events-none'
              }  ${
                value === '0'
                  ? 'pr-40 text-left pl-7'
                  : value === ''
                  ? 'bg-transparent'
                  : ''
              } ${
                type === 'action' && sign === value && !clicked
                  ? 'bg-white text-amber-500'
                  : ''
              } `}
            >
              {value}
            </button>
          );
        })}
      </div>
    </main>
  );
};

export default App;
