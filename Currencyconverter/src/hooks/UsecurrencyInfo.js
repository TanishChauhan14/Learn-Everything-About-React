import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        if (typeof currency !== "string" || currency.trim() === "") {
          console.warn("Invalid currency passed to useCurrencyInfo:", currency);
          return;
        }

        const res = await fetch(
          `https://open.er-api.com/v6/latest/${currency.toUpperCase()}`
        );
        const json = await res.json();

        if (json && json.rates) {
          setData(json.rates);
        } else {
          setData({});
          console.warn("No rates found in API response:", json);
        }
      } catch (err) {
        console.error("Error fetching currency data:", err);
      }
    };

    getData();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
