import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.pass) {
      newErrors.pass = "Password is required";
    } else if (formData.pass.length < 8) {
      newErrors.pass = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle registration logic here if form is valid
      console.log("Form submitted", formData);
      return;
    }
    console.log(errors);
  };

  return (
    <div className="bg-gray-50 flex max-w-full items-center justify-center h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Register
        </h2>
        <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
          Please Enter Your Details
        </p>
      </div>
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your Email"
            />
            {/* <button className="mt-1 absolute text-sm p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Verify</button> */}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="flex items-center">
            <label className="ml-2 block text-sm text-gray-700">
              Don't have an account{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
              .
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
