import { useState, useEffect } from "react";

function UsecurrencyInfo(currency) {
  const [data, Setdata] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        
        const res = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
        );

        const json = await res.json();


        Setdata(json[currency]);


        console.log(data);
      } catch (err) {
        console.error("Error fetching currency data:", err);
      }
    };

    getData();
  }, [currency]);

  return data;
}

export default UsecurrencyInfo;
