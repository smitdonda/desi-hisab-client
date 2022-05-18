import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  let navigate = useNavigate();
  let url = "https://desi-hishab-server.herokuapp.com/users/login";

  let handleSubmit = async (values) => {
    let res = await axios.post(url, values);

    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("firstName", res.data.firstName);
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email").required("Required"),
      password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="p-4 bg-light border border-1 border-primary all-form"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center text-primary">Login</h2>
        <hr />
        <div>
          <div className="form-floating">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor="email">Email</label>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mt-3">
          <div className="form-floating">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label htmlFor="password">Password</label>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="text-centeb md-3">
          <button className="btn btn-primary col-md-12 mt-4 mb-2">Login</button>
          <p className="text-muted mt-2 text-center">
            Not registered yet?&nbsp;
            <a href="/signup" className="text-decoration-none ">
              Create an Account
            </a>
          </p>
        </div>
        <div>
          <h5>Demo credentials</h5>
          <p>Email:user@gmail.com&nbsp;&nbsp;Password:User@7575</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
