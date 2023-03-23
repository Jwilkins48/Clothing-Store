import React from "react";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 h-80 lg:w-[45rem] lg:h-[23rem] lg:flex lg:justify-start lg:pt-20 lg:pl-10 lg:flex-col bg-gray-200 border border-green-600 rounded-lg shadow-xl items-start">
        <h1 className="text-center pt-10 lg:pt-0 font-bold text-5xl text-neutral">
          Thank you!
        </h1>
        <p className="font-bold text-center text-[16px] lg:text-2xl text-gray-500 mt-5">
          Your order has been placed!
        </p>
        <div className="flex flex-col lg:flex-row gap-4 lg:mt-5">
          <button
            className="btn mx-5 lg:mx-0 lg:ml-0 lg:w-60 btn-secondary border-primary mt-6 lg:mt-4 text-neutral"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>
          <button
            className="btn mx-5 lg:mx-0 lg:w-60 btn-primary text-gray-100 lg:mt-4"
            onClick={() => navigate("/shop/mens/shirt")}
          >
            Back To Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;
