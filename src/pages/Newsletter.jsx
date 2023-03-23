import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Newsletter() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="pb-28 ">
        <div className="lg:w-[45rem] lg:h-[26rem] lg:flex lg:flex-col lg:justify-center gap-10 mx-4 rounded-lg p-5 border border-green-600 shadow-xl">
          <div className="">
            <h1 className="text-2xl lg:text-4xl text-gray-600 font-bold">
              SUBSCRIBED!
            </h1>
            <div className="divider mt-1 mb-0"></div>
          </div>

          <p className="text-lg lg:text-[25px] lg:leading-10 lg:w-[40rem] text-gray-600 ">
            You are now subscribed to our newsletter! Check your email for
            special offers, but for now enjoy{" "}
            <span className="text-green-500 font-bold">20% off</span> your first
            order with code{" "}
            <span className="text-green-500 font-bold">THANKS20</span>
          </p>
          <Link
            className="btn w-full mt-3 bg-primary border-0 shadow-lg text-white"
            to="/shop/mens/shirt"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <p className="absolute w-full bottom-0">
        <Footer />
      </p>
    </div>
  );
}

export default Newsletter;
