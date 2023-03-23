import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

function CheckOutCardEdit({ cartItem, id, deleteCartItem, setCheckOutEdit }) {
  const [quantity, setQuantity] = useState(cartItem.amount);
  const [size, setSize] = useState(cartItem.sizing);
  const [loading, setLoading] = useState(true);

  //Quantity
  const changeQuantity = (num) => {
    setQuantity((quantity) => {
      return quantity + num;
    });
  };
  // Submit
  const onSubmit = async () => {
    const docRef = doc(db, "cartItems", id);
    await updateDoc(docRef, {
      amount: quantity,
    });
    await updateDoc(docRef, {
      sizing: size,
    });
    setCheckOutEdit(false);
    setLoading(false);
  };

  return (
    <div className="mx-5 lg:w-96 h-56 m-auto relative mt-4 mb-4 bg-[#f2f4f5] flex items-center justify-evenly rounded-2xl shadow-2xl">
      <div>
        <button
          className="absolute top-2 right-10 opacity-[.45] hover:text-blue-400"
          onClick={onSubmit}
        >
          Save
        </button>

        <button
          className="absolute top-2 right-5 opacity-[.45] hover:text-blue-400"
          onClick={() => deleteCartItem(id)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <figure className="w-20 cursor-pointer">
          <img src={cartItem.image[0]} alt={`${cartItem.gender} clothing`} />
        </figure>
      </div>

      <div className=" justify-between mt-2">
        <div className="ml-3 mb-2 w-[10.5rem]">
          <div className="text-[16px] underline font-bold text-neutral mb-1">
            {cartItem.title}
          </div>

          <p className="font-bold text-neutral text-[15px]">Quantity:</p>
          <div className="text-lg font-bold text-neutral border border-primary flex justify-around w-24 mb-2 mt-1">
            <div
              onClick={() => changeQuantity(-1)}
              className="border-r border-primary text-sm px-1 pr-3 w-6 flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-minus" />
            </div>
            <p>{quantity}</p>
            <div
              onClick={() => changeQuantity(1)}
              className="border-l border-primary text-sm px-1 pl-2 w-6 flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-plus" />
            </div>
          </div>

          <div className=" text-[16px] mt-[8px] font-bold text-neutral">
            Size: <span className="text-primary">{cartItem.sizing}</span>
            <div className="flex gap-1 mt-[3px]">
              <button
                className={
                  size === "Small"
                    ? "rounded-xl bg-primary text-secondary text-sm p-2"
                    : "rounded-xl bg-neutral text-secondary text-sm p-2"
                }
                onClick={() => setSize("Small")}
              >
                SM
              </button>
              <button
                className={
                  size === "Medium"
                    ? "rounded-xl bg-primary text-secondary text-sm p-2"
                    : "rounded-xl bg-neutral text-secondary text-sm p-2"
                }
                onClick={() => setSize("Medium")}
              >
                MD
              </button>
              <button
                className={
                  size === "Large"
                    ? "rounded-xl bg-primary text-secondary text-sm p-2"
                    : "rounded-xl bg-neutral text-secondary text-sm p-2"
                }
                onClick={() => setSize("Large")}
              >
                LG
              </button>
              <button
                className={
                  size === "XL"
                    ? "rounded-xl bg-primary text-secondary text-sm p-2"
                    : "rounded-xl bg-neutral text-secondary text-sm p-2"
                }
                onClick={() => setSize("XL")}
              >
                XL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutCardEdit;
