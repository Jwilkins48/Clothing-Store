import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import CheckOutCardEdit from "../components/CheckOutCardEdit";
import CheckOutCard from "../components/CheckOutCard";

function CheckOut({ checkOut, setCheckOut, checkOutEdit, setCheckOutEdit }) {
  const [activeMenu, setActiveMenu] = useState("");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  let cartTotal;
  let calcPrice;

  //Fetch items in cart
  useEffect(() => {
    const fetchCheckOut = async () => {
      try {
        const checkOutRef = collection(db, "cartItems");
        const checkOutSnap = await getDocs(checkOutRef);
        //Giving each item id/data
        const cart = [];
        checkOutSnap.forEach((doc) => {
          return cart.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setCart(cart);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCheckOut();
  }, [activeMenu]);

  //Delete from cart
  const deleteCartItem = async (id) => {
    if (window.confirm("Remove from cart?")) {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);

      await deleteDoc(doc(db, "cartItems", id));

      await updateDoc(doc(db, "clothing", id), {
        quantity: 1,
      });

      await updateDoc(doc(db, "clothing", id), {
        size: "Small",
      });
      console.log(checkOut);

      updatedCart?.length === 0 ? setCheckOut(false) : setCheckOut(true);
      console.log("Deleted");
    } else {
      console.log("delete cancelled");
    }
  };

  //Display cart quantity
  if (cart?.length > 0) {
    //Total items in cart
    const cartQuantity = cart?.map((item) => item.data.amount);
    cartTotal = cartQuantity?.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    //Total price
    calcPrice = cart?.reduce(
      (a, v) => (a = a + v.data.price * v.data.amount),
      0
    );
  }
  console.log(cart);

  return (
    <div className=" h-[90vh]">
      <div className="mt-20 ml-32 mb-2 lg:mt-28 lg:ml-20  font-bold opacity-[.8] text-lg text-neutral">
        <button onClick={() => navigate("/shop/mens/shirt")}>
          <i className="fa-solid fa-angle-left" /> Back To Shop
        </button>
      </div>
      <header>
        <h1 className="font-bold text-3xl text-neutral text-center mb-6 checkOut">
          Check Out
        </h1>
        <div className="divider lg:w-[50rem] lg:mx-auto mx-8 my-6">
          <i className="fa-regular text-green-500 fa-heart" />
        </div>
      </header>

      {cart?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 w- lg:w-[50rem] m-auto gap:0 lg:gap-8">
          <div>
            {cart?.map((cartItem) =>
              activeMenu === cartItem.id ? (
                <div key={cartItem.id}>
                  <CheckOutCardEdit
                    checkOutEdit={checkOutEdit}
                    checkOut={checkOut}
                    setCheckOut={setCheckOut}
                    deleteCartItem={deleteCartItem}
                    cartItem={cartItem.data}
                    id={cartItem.id}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                </div>
              ) : (
                <CheckOutCard
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  cartItem={cartItem}
                  deleteCartItem={deleteCartItem}
                />
              )
            )}
          </div>
          <div className="lg:w-[25rem] mx-5 rounded-2xl shadow-2xl bg-[#f2f4f5] mt-4 h-[21rem] relative my-0 mb-3">
            <div className="flex flex-col ml-5 mt-6">
              <p className="text-2xl ">
                {cartTotal} {cartTotal === 1 ? "ITEM" : "ITEMS"}
              </p>

              <div className="divider w-64 lg:w-80 my-3"></div>
              <div className="flex flex-col justify-end gap-2 ">
                <p>Subtotal: ${calcPrice}</p>
                <p>Shipping: $0.00</p>
                <p>Tax: $0.00</p>
                <div className="divider w-32 my-0"></div>
                <h1 className="checkOut mt-1 text-neutral">
                  Total: ${calcPrice}
                </h1>
                <button
                  data-theme="corporate"
                  onClick={() => navigate("/orderPlaced")}
                  className="btn btn-accent text-gray-100 rounded-lg border-0 mr-5 checkOut"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[20rem]">
          <p className="text-3xl mb-5 font-bold text-neutral">
            Your Cart Is Empty
          </p>
          <button
            onClick={() => navigate("/shop/mens/shirt")}
            className="btn w-40 bg-blue-300 border-none"
          >
            Go Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
