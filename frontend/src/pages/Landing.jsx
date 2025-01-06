import React from "react";
// import "./styles.css";
import landing from "../assets/landing.png";

function Landing() {
  return (
    <>
      <header className="w-full absolute top-5 text-center">
        <nav>
          <a href="#" className=" mr-10">
            Home
          </a>
          <a href="#page-2" className=" mr-10">
            About
          </a>
          <a href="#page-2" className=" mr-10">
            Doctor
          </a>
          <a href="#" className=" mr-10">
            Contact
          </a>
        </nav>
      </header>
      <main className="bg-[#F9F3F3] h-screen flex justify-center items-center">
        <div className="container mx-auto bg-white py-10 flex justify-around items-center rounded-3xl">
          <div className="ml-10 ">
            <h2 className="text-5xl font-serif">Empowering</h2>
            <h2 className="text-5xl font-serif">lives through</h2>
            <h2 className="text-5xl font-serif ">Health care</h2>
            <div className="absolute mt-10">
              <p className="font-mono w-3/4">
                How can we assist you today? Please select the following option
                !
              </p>
              <button className="mt-2 bg-[#4239F2BD] text-white font-bold py-2 px-4 rounded-2xl">
                Show more
              </button>
            </div>
          </div>
          <div>
            <img src={landing} alt="" />
          </div>
        </div>
      </main>
      <main className="bg-[#F9F3F3] h-screen flex justify-center flex-col relative">
        <h1 className="absolute top-10 text-center w-full text-3xl font-bold ">3 Easy steps and get your medical solutions with us</h1>
        <div className="container mx-auto bg-white py-10 flex justify-around items-center rounded-3xl">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </main>
    </>
  );
}

export default Landing;
