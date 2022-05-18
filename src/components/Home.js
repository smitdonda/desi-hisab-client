import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";

function Home() {
  let navigate = useNavigate();

  // check auth
  let chackAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };

      // auth post method
      let res = await axios.post(
        "https://desi-hishab-server.herokuapp.com/users/auth",
        { purpose: "validate access" },
        config
      );
      if (res.data.statusCode !== 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  // 1 print all transactions data (get)
  let [transactions, setTransactions] = useState([]);
  let transactionsData = async () => {
    let transaction = await axios.get(
      "https://desi-hishab-server.herokuapp.com/users/gettransection/"
    );
    setTransactions(transaction.data);
  };
  //2 print all salaries data (get)
  let [salary, setSalary] = useState([]);
  let salariesData = async () => {
    let sal = await axios.get("https://desi-hishab-server.herokuapp.com/users/getsalaries");
    setSalary(sal.data);
  };

  // 1.1 get sum of all transactions data
  let [sumtransaction, setSumTransaction] = useState();
  let sumtra = async () => {
    let sum = await axios.get("https://desi-hishab-server.herokuapp.com/users/sumtransaction");
    setSumTransaction(sum.data.user[0].totalamount);
  };

  //2.1 get sum of all salaries data
  let [sumsalaries, setSumSalaries] = useState();
  let sumSal = async () => {
    let sum = await axios.get("https://desi-hishab-server.herokuapp.com/users/sumsalaries");
    setSumSalaries(sum.data.user[0].totalamount);
  };

  // sum of all transactions data and sum of all salaries data
  let [total, setTotal] = useState();
  let handletotal = () => {
    let res = sumsalaries - sumtransaction;
    setTotal(res);
  };
  useEffect(() => {
    handletotal();
  });

  // delete transactionData
  let deleteTurl = "https://desi-hishab-server.herokuapp.com/users/deletetransaction/";
  let handleTransactionDelete = async (id) => {
    let del = await axios.delete(deleteTurl + id);
    if (del.data.statusCode === 200) {
      transactionsData();
    }
  };

  // delete salariesData
  let SalariesDeleteurl = "https://desi-hishab-server.herokuapp.com/users/deleteaddsalaries/";
  let handleSalariesDelete = async (id) => {
    let del = await axios.delete(SalariesDeleteurl + id);

    if (del.data.statusCode === 200) {
      salariesData();
    }
  };

  useEffect(() => {
    transactionsData();
    salariesData();
    sumSal();
    sumtra();
    chackAuth();
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="d-flex flex-row justify-content-end mb-4 ">
          <a
            href="/addtransaction/new"
            className="btn btn-success shadow-none text-white mt-3 mr-1 "
          >
            Add Transaction
          </a>
          <a
            href="/addsalaries/new"
            className="btn btn-success text-white shadow-none  mt-3 mr-1 "
          >
            ADD Salary
          </a>
        </div>
        <div className="container main-div" style={{ maxWidth: "450px" }}>
          <div className="col bg-light">
            <div className="d-flex p-3">
              <h6>Inflow</h6>
              <div className="inflow d-flex ml-auto">
                <p className="text-success" style={{ fontSize: "20px" }}>
                  &#8377;{sumsalaries ? sumsalaries : 0}
                </p>
              </div>
            </div>
            <div className="d-flex p-3 ">
              <h6>Outflow</h6>
              <div className="inflow d-flex ml-auto  bg-light">
                <p className="text-danger" style={{ fontSize: "19px" }}>
                  - &#8377; {sumtransaction ? sumtransaction : 0}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex p-3">
              <h6>Total</h6>
              <div className="inflow d-flex ml-auto">
                <p className="text-success h4 ">&#8377; {total ? total : 0}</p>
              </div>
            </div>
          </div>
          {/* salaries */}
          <div className="border border-dark p-3 mt-3">
            <h5 className="mt-3">Inflow</h5>
            <hr />
            {salary?.user?.map((s, i) => {
              return (
                <div key={i} className="bg-light p-4 mb-3">
                  <div className="d-flex">
                    <div>
                      <p>{s.date}</p>
                      <p>{s.nots}</p>
                    </div>
                    <div className="ml-auto " style={{ fontSize: "25px" }}>
                      <p className="text-success"> + &#8377;{s.amount} </p>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <Link to={`/addsalaries/${s._id}`}>
                      <Button
                        variant="warning"
                        size="sm"
                        className="mt-2 shadow-none"
                      >
                        <ModeEditOutlineIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        handleSalariesDelete(s._id);
                      }}
                      className="mt-2 shadow-none "
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Transaction */}
          <div className="col border border-dark mt-3 transaction overflow-scroll ">
            <h5 className=" mt-3">Outflow</h5>
            <hr />
            {transactions?.user?.map((t, i) => {
              return (
                <div
                  key={i}
                  className="bg-light p-4 mb-3"
                  style={{ height: "auto" }}
                >
                  <div className="d-flex">
                    <div>
                      <div>{t.wallet}</div>
                      <div>{t.category}</div>
                    </div>
                    <div className="ml-auto" style={{ fontSize: "20px" }}>
                      <p className="text-danger"> - &#8377;{t.amount} </p>
                    </div>
                  </div>
                  <div>
                    <div>{t.date}</div>
                    <div>{t.nots}</div>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <Link to={`/addtransaction/${t._id}`}>
                      <Button
                        variant="warning"
                        size="sm"
                        className="mt-2 shadow-none"
                      >
                        <ModeEditOutlineIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        handleTransactionDelete(t._id);
                      }}
                      className="mt-2 shadow-none "
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
