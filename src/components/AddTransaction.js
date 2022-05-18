import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { DesiHisab } from "../App";
import Header from "./Header";

function AddTransaction() {
  let context = useContext(DesiHisab);

  let navigate = useNavigate();
  let { id } = useParams();

  if (id !== "new") {
    // edit method
    if (context && context.transactions) {
      let transactionindex = context?.transactions?.findIndex(
        (t) => t._id === id
      );
      var edittransactions = context?.transactions[transactionindex];
    }
    // edittransactionsurl
    var handleSubmit = async (values) => {
      let res = await axios.put(
        "https://desi-hishab-server.herokuapp.com/users/edittransaction/" + id,
        values
      );
      if (res) {
        if (res.status === 200) {
          navigate("/home");
        }
      }
    };
  } else {
    // Post method
    handleSubmit = async (values) => {
      let res = await axios.post(
        "https://desi-hishab-server.herokuapp.com/users/addtransaction",
        values
      );
      if (res.status === 200) {
        navigate("/home");
      }
    };
  }
  // formik validation
  let transaction = useFormik({
    initialValues: {
      wallet: edittransactions?.wallet ? edittransactions?.wallet : "",
      category: edittransactions?.category ? edittransactions?.category : "",
      amount: edittransactions?.amount ? edittransactions?.amount : "",
      date: edittransactions?.date ? edittransactions?.date : "",
      nots: edittransactions?.nots ? edittransactions?.nots : "",
    },
    validationSchema: yup.object({
      wallet: yup.string().required("Required"),
      category: yup.string().required("Required"),
      amount: yup.number().required("Required"),
      date: yup.date().required("Required"),
      nots: yup.string(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <Header />
      <div className="d-flex flex-row justify-content-center align-items-center mt-2 mb-4">
        <form
          onSubmit={transaction.handleSubmit}
          className="mt-2 all-form"
          style={{ maxWidth: "350px" }}
        >
          <h2>Add Transaction</h2>
          <hr />
          <div className="mb-3">
            <label htmlFor="wallet" className="mt-4">
              Wallet
            </label>
            <input
              type="text"
              id="wallet"
              name="wallet"
              className="form-control"
              placeholder="Wallet"
              onBlur={transaction.handleBlur}
              onChange={transaction.handleChange}
              value={transaction.values.wallet}
            />
            {transaction.touched.wallet && transaction.errors.wallet ? (
              <div className="text-danger">{transaction.errors.wallet}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="category">Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              onBlur={transaction.handleBlur}
              onChange={transaction.handleChange}
              value={transaction.values.category}
            >
              <option value="Category">Category</option>
              <option value="Food & Beverag">Food & Beverag</option>
              <option value="Transportation">Transportation</option>
              <option value="Rentals">Rentals</option>
              <option value="Water Bill">Water Bill</option>
              <option value="Phone Bill">Phone Bill</option>
              <option value="Electricity Bill">Electricity Bill</option>
              <option value="Gas Bill">Gas Bill</option>
              <option value="Other Bills">Other</option>
            </select>
            {transaction.touched.category && transaction.errors.category ? (
              <div className="text-danger">{transaction.errors.category}</div>
            ) : null}
          </div>
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="form-control"
                placeholder="Amount"
                onBlur={transaction.handleBlur}
                onChange={transaction.handleChange}
                value={transaction.values.amount}
              />
              {transaction.touched.amount && transaction.errors.amount ? (
                <div className="text-danger">{transaction.errors.amount}</div>
              ) : null}
            </div>

            <div className="mb-3 col">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control text-uppercase"
                placeholder="Date"
                onBlur={transaction.handleBlur}
                onChange={transaction.handleChange}
                value={transaction.values.date}
              />
              {transaction.touched.date && transaction.errors.date ? (
                <div className="text-danger">{transaction.errors.date}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nots">Nots</label>
            <textarea
              type="text"
              id="nots"
              name="nots"
              className="form-control"
              placeholder="Same Nots"
              style={{ resize: "none" }}
              onBlur={transaction.handleBlur}
              onChange={transaction.handleChange}
              value={transaction.values.nots}
              rows={2}
            />
          </div>
          {id !== "new" ? (
            <Button variant="warning" className="shadow-none" type="submit">
              Update
            </Button>
          ) : (
            <Button variant="primary" className="shadow-none" type="submit">
              Submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

export default AddTransaction;
