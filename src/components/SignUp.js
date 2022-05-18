import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUp() {
  let navigate = useNavigate();

  let url = "https://desi-hishab-server.herokuapp.com/users/signup";

  let handleSubmit = async (values) => {
    let res = await axios.post(url, values);
    if (res.data.statusCode === 200) {
      navigate("/login");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Required"),
      email: yup.string().email("Invalid Email").required("Required"),
      password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      cpassword: yup
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
      className="backImg d-flex flex-row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="pr-5 pl-5 pt-3 bg-light pb-3 border border-1 border-primary all-form"
        style={{ width: "450px" }}
      >
        <h2 className="text-center text-primary">Sign Up</h2>
        <hr className=" mb-4" />
        {/* Login Form */}
        <div className=" mb-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="myusername"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <label htmlFor="username">Username</label>
          </div>

          {formik.touched.username && formik.errors.username ? (
            <div style={{ color: "red" }}>{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="mb-3 ">
          <div className="form-floating">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor="email">Email Id</label>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <div className="form-floating ">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label htmlFor="password">Password</label>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <div className="form-floating ">
            <input
              className="form-control"
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.cpassword}
            />
            <label htmlFor="password">Confirm Password</label>
          </div>
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <div style={{ color: "red" }}>{formik.errors.cpassword}</div>
          ) : null}
          {formik.values.password === formik.values.cpassword ? (
            <div>Password should be matched</div>
          ) : null}
        </div>

        <div>
          <button
            className="btn btn-primary btn-block shadow-none text-uppercase"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="text-center mt-1">
          <p className="text-muted">
            Have an account?&nbsp;
            <a href="/login" className="text-decoration-none">
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
