import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import useAxios from "../pages/api/useAxios";
import axios from "axios";
import { rowData } from "./api/rawData.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isFrom, setIsFrom] = useState(false);
  const [isTo, setIsTo] = useState(false);
  const [fromForm, setFromForm] = useState("USD");
  const [toForm, setToForm] = useState("RUB");
  const [firstAmount, setFirstAmount] = useState("");
  const [resultCurrency, setResultCurrency] = useState("");
  const [tableData, setTableData] = useState(rowData);

  const [dataC] = useAxios("https://restcountries.com/v3.1/all");
  const dataFilter = dataC.filter((item) => "currencies" in item);

  const dataCountries = dataFilter.map((item) => {
    return (
      <a
        onClick={() =>
          isFrom
            ? setFromForm(Object.keys(item.currencies)[0])
            : setToForm(Object.keys(item.currencies)[0])
        }
        className="cursor-pointer flex flex-row rounded px-2 justify-between items-center hover:bg-gray-100"
        key={item.name.common}
      >
        <p>{Object.keys(item.currencies)[0]}</p>
        <p className="">
          {item.name.common.length > 9
            ? item.name.common.slice(0, 9) + "..."
            : item.name.common}
        </p>
        <Image
          src={item.flags.svg}
          priority
          width={500}
          height={500}
          className="rounded w-10 h-7 shadow ml-2 my-1 "
          alt="category"
        ></Image>
      </a>
    );
  });

  useEffect(() => {
    if (firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "6RUbhWYPlNbnFdsiEBNDrr2WfJDchjPy8kfR22SS",
          base_currency: fromForm,
          currencies: toForm,
        },
      })
        .then((response) => setResultCurrency(response.data.data[toForm]))
        .catch((error) => console.log(error));
    }
  }, [firstAmount, fromForm, toForm]);

  return (
    <div>
      <div className=" flex flex-row mt-3 ml-3">
        <p>Введите количество валюты</p>
        <p className="ml-8">Из</p>
        <p className="ml-[71px]">В</p>
      </div>
      <div className="flex flex-row">
        <input
          placeholder="Введите количество"
          value={firstAmount}
          onChange={(e) => setFirstAmount(e.target.value)}
          className="px-3 my-3 mx-2 shadow rounded-md border border-gray-300 transition ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        ></input>
        <div className="my-3 mx-2">
          <button
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            type="button"
            onClick={() => setIsFrom(!isFrom)}
          >
            {fromForm} <HiOutlineChevronUpDown />
          </button>

          <div
            className={` bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${
              isFrom ? "absolute" : "hidden"
            }`}
          >
            <ul className="overflow-auto max-h-64">{dataCountries}</ul>
          </div>
        </div>
        <div className="my-3 mx-2">
          <button
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            type="button"
            onClick={() => setIsTo(!isTo)}
          >
            {toForm} <HiOutlineChevronUpDown />
          </button>

          <div
            className={` bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${
              isTo ? "absolute" : "hidden"
            }`}
          >
            <ul className="overflow-auto max-h-64">{dataCountries}</ul>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <button className="mx-2 inline-flex text-white items-center justify-center rounded-md border  bg-red-500 py-2 px-10 text-sm font-medium shadow-sm  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 ">
          Sell
        </button>
        <button className="mx-2 inline-flex text-white items-center justify-center rounded-md border  bg-green-500 py-2 px-10 text-sm font-medium shadow-sm  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 ">
          Buy
        </button>
      </div>
      <div className="ml-3 flex flex-row gap-1">
        <p className="text-lg">{firstAmount}</p>
        <p className="text-lg">{fromForm}=</p>
      </div>
      <div className="ml-3 flex flex-row gap-1">
        <p className="font-bold text-xl">{resultCurrency * firstAmount}</p>
        <p className="font-bold text-xl">{toForm}</p>
      </div>

      <div className="relative overflow-x-auto mt-24 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead>
            <tr className="border-b-2">
              <th>Id</th>
              <th>Creaton time </th>
              <th>Change time</th>
              <th>Status</th>
              <th>Side</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Instrument</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData) => (
              <tr key={rowData.id}>
                <td>{rowData.id}</td>
                <td>{rowData.creationTime}</td>
                <td>{rowData.changeTime}</td>
                <td>{rowData.status}</td>
                <td>{rowData.side}</td>
                <td>{rowData.price}</td>
                <td>{rowData.amount}</td>
                <td>{rowData.instrument}</td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
