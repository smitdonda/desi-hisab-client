import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddTransaction from "./components/AddTransaction";
import AddSalaries from "./components/AddSalaries";
import Activity from "./components/Activity ";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const DesiHisab = React.createContext();

function App() {
  // 1 print all transactions data (get)
  let [transactions, setTransactions] = useState();

  let transactionsData = async () => {
    let transaction = await axios.get(
      "https://desi-hishab-server.herokuapp.com/users/gettransection"
    );
    setTransactions(transaction.data.user);
  };

  //2 print all salaries data (get)
  let [salary, setSalary] = useState([]);
  let salariesData = async () => {
    let sal = await axios.get(
      "https://desi-hishab-server.herokuapp.com/users/getsalaries"
    );
    setSalary(sal.data.user);
  };
  useEffect(() => {
    transactionsData();
    salariesData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <DesiHisab.Provider value={{ transactions, salary }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addtransaction/:id" element={<AddTransaction />} />
            <Route path="/addsalaries/:id" element={<AddSalaries />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </DesiHisab.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
