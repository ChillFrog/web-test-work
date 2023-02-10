import React, { useState } from "react";

const DataForm = ({
  onCreate,
  fromForm,
  toFrom,
  firstAmount,
  resultCurrency,
}) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  const [id, setId] = useState(1);
  const [creationTime, setCreationTime] = useState(dateTime);
  const [changeTime, setchangeTime] = useState(dateTime);
  const [status, setStatus] = useState("active");
  const [side, setSide] = useState("");
  const [price, setPrice] = useState(resultCurrency);
  const [amount, setAmount] = useState(firstAmount);
  const [instrument, setInstrument] = useState(`${fromForm}/${toFrom}`);

  console.log(fromForm);
  const onSubmitCallback = function (e) {
    e.preventDefault();
    onCreate({
      id,
      creationTime,
      changeTime,
      status,
      side,
      price,
      amount,
      instrument,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitCallback} className="flex flex-row">
        <button
          onClick={() => {
            setId(id + 1);
            setSide("sell");
            setInstrument(`${fromForm}/${toFrom}`);
            setPrice(resultCurrency);
            setAmount(firstAmount);
            setCreationTime(dateTime);
            setchangeTime(dateTime);
          }}
          type="submit"
          className="mx-2 inline-flex text-white items-center justify-center rounded-md border  bg-red-500 py-2 px-10 text-sm font-medium shadow-sm  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 "
        >
          Sell
        </button>
        <button
          onClick={() => {
            setId(id + 1);
            setSide("buy");
            setInstrument(`${fromForm}/${toFrom}`);
            setPrice(resultCurrency);
            setAmount(firstAmount);
            setCreationTime(dateTime);
            setchangeTime(dateTime);
          }}
          type="submit"
          className="mx-2 inline-flex text-white items-center justify-center rounded-md border  bg-green-500 py-2 px-10 text-sm font-medium shadow-sm  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 "
        >
          Buy
        </button>
      </form>
    </div>
  );
};

export default DataForm;
