import React from "react";

function CheckOutCard({ cartItem, activeMenu, setActiveMenu, deleteCartItem }) {
  const toggleActive = (id) => {
    if (activeMenu == "") {
      setActiveMenu(id);
    } else {
      setActiveMenu("");
    }
  };
  return (
    <div
      key={cartItem.id}
      className={
        "mx-5 lg:w-96 h-44 m-auto relative mt-4 mb-4 bg-[#f2f4f5] flex items-center justify-evenly rounded-2xl shadow-2xl"
      }
    >
      <div>
        <button
          className="absolute top-2 right-10 opacity-[.45] hover:text-blue-400"
          onClick={() => {
            toggleActive(cartItem.id);
          }}
        >
          Edit
        </button>

        <button
          className="absolute top-2 right-5 opacity-[.45] hover:text-blue-400"
          onClick={() => deleteCartItem(cartItem.id)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <figure className="w-20 cursor-pointer">
          <img
            src={cartItem?.data.image[0]}
            alt={`${cartItem?.data.gender} clothing`}
          />
        </figure>
      </div>

      <div className=" justify-between mt-2">
        <div className="ml-3 mb-2 w-[10.5rem]">
          <div className="text-[16px] underline font-bold text-neutral mb-1">
            {cartItem.data.title}
          </div>
          <p className="font-bold text-neutral text-[15px]">
            Quantity:{" "}
            <span className="text-primary ">{cartItem.data.amount}</span>
          </p>
          <div className=" text-[16px] font-bold text-neutral">
            Size: <span className="text-primary">{cartItem.data.sizing}</span>
          </div>
          <div className=" font-bold text-neutral">${cartItem.data.price}</div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutCard;
