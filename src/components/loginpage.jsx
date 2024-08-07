import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mycontext } from "./context";
import { useNavigate } from "react-router-dom";

const ModernLoginPage = () => {

//useContext 
  const { user, setIsLogged } = useContext(Mycontext);



  // useNavigate using 
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: (values) => {
      const existinguser = user.find(
        (item) =>
          item.email === values.email && item.password === values.password
      );
      const foundUser = user.find(
        (item) =>
          item.email === values.email && item.password !== values.password
      );

      if (existinguser) {
        console.log("welcome admin");
        localStorage.setItem("id", existinguser.id);
        setIsLogged(true);
        if (values.email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else if (foundUser) {
        alert("Incorrect Password/Username");
      } else {
        alert("You don’t have an account");
        navigate("/signup");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.username && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.username && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-shadow duration-300 hover:shadow-lg"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ModernLoginPage;
