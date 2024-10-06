import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const idukki = {
    Municipality: [{ name: "Thodupuzha" }, { name: "Kattappana" }],
    GramPanchayat: [
      { name: "Adimaly" },
      { name: "Alakkode" },
      { name: "Arakkuklam" },
      { name: "Ayyappancoil" },
      { name: "Bysonvalley" },
      { name: "Chakkupallam" },
      { name: "Chinnakkanal" },
      { name: "Devikulam" },
      { name: "Edavetty" },
      { name: "Edamalakkudy" },
      { name: "Elappara" },
      { name: "Erattayar" },
      { name: "Kanjikuzhi" },
      { name: "Kamakshi" },
      { name: "Kanchiyar" },
      { name: "Kanthalloor" },
      { name: "Karimannoor" },
      { name: "Karimkunnam" },
      { name: "Karunapuram" },
      { name: "Kodikkulam" },
      { name: "Kokkayar" },
      { name: "Konnathady" },
      { name: "Kudayathoor" },
      { name: "Kumali" },
      { name: "Kumaramangalam" },
      { name: "Manakkad" },
      { name: "Mankulam" },
      { name: "Marayoor" },
      { name: "Mariyapuram" },
      { name: "Munnar" },
      { name: "Muttom" },
      { name: "Nedumkandom" },
      { name: "Pallivasal" },
      { name: "Pampadumpara" },
      { name: "Peerumedu" },
      { name: "Peruvanthanam" },
      { name: "Purappuzha" },
      { name: "Rajakkad" },
      { name: "Rajakumari" },
      { name: "Santhanpara" },
      { name: "Senapathy" },
      { name: "Udumbanchola" },
      { name: "Udumbannoor" },
      { name: "Upputhara" },
      { name: "Vandanmedu" },
      { name: "Vandipperiyar" },
      { name: "Vannappuram" },
      { name: "Vathikkudy" },
      { name: "Vattavada" },
      { name: "Vazhathoppu" },
      { name: "Vellathooval" },
      { name: "Velliyamattom" },
    ],
  };
  const [selectedType, setSelectedType] = useState(''); 
  const [localBodies, setLocalBodies] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    address: "",
    localBodyType: "",
    localBodyName: "",
    mobile: "",
    otp: "",
    email: "",
    pass: "",
    c_pass: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.pass) {
      newErrors.pass = "Password is required";
    } else if (formData.pass.length < 6) {
      newErrors.pass = "Password must be at least 6 characters long";
    }
    if (formData.c_pass !== formData.pass) {
      newErrors.c_pass = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTypeChange = (event) => {
    
    const selected = event.target.value;
    setSelectedType(selected);
    setLocalBodies(idukki[selected] || []);
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

  const handleReset = () => {
    setFormData({
      name: "",
      district: "",
      address: "",
      localBodyType: "",
      localBodyName: "",
      mobile: "",
      otp: "",
      email: "",
      pass: "",
      c_pass: "",
    });
    setErrors({});
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
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                District
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Idukki">Idukki</option>
                {/* <option value="Alappuzha">Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option> */}
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Address"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Type of Local Body
              </label>
              <select
                name="localBodyType"
                value={selectedType}
                onChange={handleTypeChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Local Body Type</option>
                <option value="Municipality">Municipality</option>
                <option value="Corporation">Corporation</option>
                <option value="GramPanchayat">Panchayath</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Name of Local Body
              </label>
              <select
                name="localBodyName"
                value={formData.localBodyName}
                onChange={handleChange}
                
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {localBodies.map((body, index) =>(
                  <option  size="15" key={index} value={body.name} className="bg-slate-800 text-white ">{body.name}</option>
                ))};
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-2/3">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mobile Number"
              />
              {/* <button className="mt-1 absolute text-sm p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Verify</button> */}
            </div>
            <div className="w-1/4">
              <button className="absolute mt-6 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Verify
              </button>
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter OTP"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
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
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="c_pass"
                value={formData.c_pass}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Your Password"
              />
            </div>
          </div>
          <div className="flex items-center">
            <label className="ml-2 block text-sm text-gray-700">
              Already a member{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Login
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

export default RegisterPage;
