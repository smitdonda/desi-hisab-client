import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { DesiHisab } from "../App";
import Header from "./Header";

function Addsalaries() {
  let context = useContext(DesiHisab);

  let navigate = useNavigate();
  let { id } = useParams();

  if (id !== "new") {
    if (context?.salary) {
      let sfindIndex = context?.salary?.findIndex((e) => e._id === id);
      var editsalaries = context?.salary[sfindIndex];
    }
    var handleSubmit = async (values) => {
      let res = await axios.put(
        "https://desi-hishab-server.herokuapp.com/users/editsalaries/" + id,
        values
      );
      if (res) {
        if (res.status === 200) {
          navigate("/home");
        }
      }
    };
  } else {
    handleSubmit = async (values) => {
      let res = await axios.post(
        "https://desi-hishab-server.herokuapp.com/users/addsalaries",
        values
      );
      if (res.status === 200) {
        navigate("/home");
      }
    };
  }

  let salaries = useFormik({
    initialValues: {
      amount: editsalaries?.amount ? editsalaries?.amount : "",
      date: editsalaries?.date ? editsalaries?.date : "",
      nots: editsalaries?.nots ? editsalaries?.nots : "",
    },
    validationSchema: yup.object({
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
          onSubmit={salaries.handleSubmit}
          className="mt-2 all-form"
          style={{ maxWidth: "350px" }}
        >
          <h3>Add Salary</h3>
          <hr />
          <div className="mb-3">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control"
              placeholder="Amount"
              onBlur={salaries.handleBlur}
              onChange={salaries.handleChange}
              value={salaries.values.amount}
            />
            {salaries.touched.amount && salaries.errors.amount ? (
              <div className="text-danger">{salaries.errors.amount}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control text-uppercase"
              placeholder="Date"
              onBlur={salaries.handleBlur}
              onChange={salaries.handleChange}
              value={salaries.values.date}
            />
            {salaries.touched.date && salaries.errors.date ? (
              <div className="text-danger">{salaries.errors.date}</div>
            ) : null}
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
              onBlur={salaries.handleBlur}
              onChange={salaries.handleChange}
              value={salaries.values.nots}
              rows={2}
            />
          </div>

          {id !== "new" ? (
            <Button variant="warning" type="submit">
              Update
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

export default Addsalaries;
