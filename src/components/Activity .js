import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { Chart } from "react-google-charts";

function Activity() {
  const [currentRadioValue, setCurrentRadioValue] = useState("all");
  const handleRadioChange = (e) => {
    setCurrentRadioValue(e.target.value);
  };

  // all activity
  let [alltransactions, setAllTransactions] = useState([]);
  const alltransactionsdata = [["Task", "All Activity"]];
  const talltransactionsOptions = {
    title: "All Activities",
  };
  let transactionsData = async () => {
    let transaction = await axios.get(
      "http://desi-hishab-server.herokuapp.com/users/all-activity-gettransection"
    );
    setAllTransactions(transaction.data.user);
  };
  if (currentRadioValue === "all") {
    if (alltransactions) {
      for (var i = 0; i < alltransactions.length; i++) {
        alltransactionsdata.push([
          alltransactions[i]._id,
          +alltransactions[i].totalAmount,
        ]);
      }
    }
  }

  // today activity
  let [todaytransition, setToDayTrans] = useState();
  const toDaydata = [["Task", "To Day Activity"]];
  let toDayData = async () => {
    var toDay = await axios.get(
      "https://desi-hishab-server.herokuapp.com/users/todaysgraphtransaction"
    );
    setToDayTrans(toDay.data.user);
  };
  if (currentRadioValue === "toDay") {
    if (todaytransition) {
      for (var t = 0; t < todaytransition?.length; t++) {
        toDaydata.push([
          todaytransition[t]?._id,
          +todaytransition[t]?.totalAmount,
        ]);
      }
    }
  }
  const toDayOptions = {
    title: "My Daily Activities",
  };

  // past 7 days of activity
  let [pastSavenDays, setPastSavenDays] = useState();
  const pastSavenDaysdata = [["Element", "Past 7 Days"]];
  let savenDayData = async () => {
    let pastSavenDays = await axios.get(
      "https://desi-hishab-server.herokuapp.com/users/past-savendays-transaction"
    );
    setPastSavenDays(pastSavenDays.data.user);
  };
  if (currentRadioValue === "pastSavenDays") {
    if (pastSavenDays) {
      for (var p = 0; p < pastSavenDays.length; p++) {
        pastSavenDaysdata.push([
          pastSavenDays[p]._id,
          +pastSavenDays[p].totalAmount,
        ]);
      }
    }
  }

  // past Month activity
  let [pastMonth, setPastMonth] = useState();
  const monthData = [["Task", "Month Activity"]];
  const monthOptions = {
    title: "My Month Activities",
  };
  let pastMonthData = async () => {
    let pastM = await axios.get(
      "https://desi-hishab-server.herokuapp.com/users/past-month-transaction"
    );
    setPastMonth(pastM.data.user);
  };
  if (currentRadioValue === "pastMonth") {
    if (pastMonth) {
      for (var m = 0; m < pastMonth.length; m++) {
        monthData.push([pastMonth[m]._id, +pastMonth[m].totalAmount]);
      }
    }
  }
  useEffect(() => {
    transactionsData();
    toDayData();
    savenDayData();
    pastMonthData();
  }, []);
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div>
          <form className="activity m-5 bg-light p-2">
            <div className="form-check">
              <label className="radio">
                <input
                  className="form-check-input "
                  type="radio"
                  name="flexRadioDefault"
                  value="all"
                  onChange={handleRadioChange}
                  checked={currentRadioValue === "all"}
                />
                All
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value="toDay"
                  onChange={handleRadioChange}
                  checked={currentRadioValue === "toDay"}
                />
                Today
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value="pastSavenDays"
                  onChange={handleRadioChange}
                  checked={currentRadioValue === "pastSavenDays"}
                />
                Past 7 Days
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value="pastMonth"
                  onChange={handleRadioChange}
                  checked={currentRadioValue === "pastMonth"}
                />
                Past Month
              </label>
            </div>
          </form>
        </div>
        {currentRadioValue === "all" ? (
          <div>
            <Chart
              chartType="PieChart"
              loader={
                <div className="d-flex flex-row justify-content-center">
                  <div className="loader"></div>
                </div>
              }
              data={alltransactionsdata}
              options={talltransactionsOptions}
              width={"100%"}
              height={"400px"}
            />
          </div>
        ) : null}

        {currentRadioValue === "toDay" ? (
          <div>
            <Chart
              chartType="PieChart"
              loader={
                <div className="d-flex flex-row justify-content-center">
                  <div className="loader"></div>
                </div>
              }
              data={toDaydata}
              options={toDayOptions}
              width={"100%"}
              height={"400px"}
            />
          </div>
        ) : null}

        {currentRadioValue === "pastSavenDays" ? (
          <div>
            <Chart
              chartType="PieChart"
              data={pastSavenDaysdata}
              loader={
                <div className="d-flex flex-row justify-content-center">
                  <div className="loader"></div>
                </div>
              }
              width="100%"
              height="400px"
            />
          </div>
        ) : null}

        {currentRadioValue === "pastMonth" ? (
          <div>
            <Chart
              chartType="PieChart"
              loader={
                <div className="d-flex flex-row justify-content-center">
                  <div className="loader"></div>
                </div>
              }
              data={monthData}
              options={monthOptions}
              width={"100%"}
              height={"400px"}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Activity;
