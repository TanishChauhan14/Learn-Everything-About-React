function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currenyOptions = [],
    selectcurrency = "usd",
    amountdisable = false,
    currenydisable = false,
    className = "",
}) {
    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex `}>
            <div className="w-1/2">
                <label  className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled ={amountdisable} // If anuone pass we will utilise.
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    disabled = {currenydisable}
                    value={selectcurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                >
                    {
                        currenyOptions.map((Currency) => (
                        
                            <option key={Currency} value={Currency}>
                               {Currency}
                            </option>
                        
                        ))
                    }
                        
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;
