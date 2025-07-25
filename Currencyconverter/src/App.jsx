import React, { useState } from 'react'
import InputBox from './components/InputBox'
import UsecurrencyInfo  from './hooks/UsecurrencyInfo'


const App = () => {

  const [Amount , SetAmount] = useState(0)
  const [From , SetFrom] = useState("USD")
  const [To , Setto] = useState("INR")
  const [convertedAmount , setconvertedAmount] = useState(0)

  const currencyInfo = UsecurrencyInfo(From)

  const options = (Object.keys(currencyInfo))

  const convert = () => {
   return setconvertedAmount( Amount * currencyInfo[To])
  }

  const swap = () => {
  SetFrom(To);
  Setto(From);
  SetAmount(convertedAmount);
  setconvertedAmount(Amount);
};




  return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/1791583/pexels-photo-1791583.jpeg?_gl=1*14cpakt*_ga*MjAyNjY2ODY0Ni4xNzM5MDAwODUw*_ga_8JE65Q40S6*czE3NTM0MjI5MTAkbzckZzEkdDE3NTM0MjMwMjckajYkbDAkaDA.')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={Amount}
                                currenyOptions={options}
                                onCurrencyChange={(currency) => SetAmount(Amount)}
                                onAmountChange={(Amount) => SetAmount(Amount)}
                                selectcurrency={From}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currenyOptions={options}
                                onCurrencyChange={(currency) => Setto(currency)}
                                onAmountChange={(Amount) => {Setto(Amount)}}
                                selectcurrency={To}
                                amountdisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {From} to {To}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
