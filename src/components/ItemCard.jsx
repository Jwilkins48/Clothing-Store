import { useState, useEffect, useId } from "react";
import { useParams } from "react-router-dom";
import {
  setDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";

function ItemCard({ item, id, setCheckOut, quantity, setQuantity }) {
  const params = useParams();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("SM");
  const [wishlist, setWishlist] = useState(false);
  let newId = item?.title;

  //If item is in cart - match quantity
  useEffect(() => {
    const fetchClothes = async () => {
      const itemRef = doc(db, "cartItems", params.id);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        setQuantity(itemSnap.data().amount);
        setLoading(false);
      } else {
        console.log("no");
        setLoading(false);
      }
    };
    fetchClothes();
  }, [params.id]);

  //Size
  const handleClick = async (size) => {
    setSize(size);
    setLoading(false);
  };

  //Quantity
  const adjustQuantity = (amount) => {
    setQuantity((quantity) => {
      return quantity + amount;
    });
  };

  //Add to cart
  const handleAddToCart = async () => {
    const docRef = doc(db, "cartItems", params.id);
    const docSnap = await getDoc(docRef);

    const docRefDuplicate = doc(db, "cartItems", newId);
    const docSnapDuplicate = await getDoc(docRefDuplicate);

    //If item is in cart add quantity - else add to collection
    //NEW ITEM
    if (!docSnap.exists()) {
      const copy = {
        ...item,
        sizing: size,
        amount: quantity,
      };
      await setDoc(doc(db, "cartItems", id), copy);
      setCheckOut(true);
      setLoading(false);
      alert("added to cart!");

      //SAME ITEM DIFFERENT SIZE
    } else if (docSnap.exists() && docSnap.data().sizing !== size) {
      console.log("Different Size");
      alert("added to cart!");
      const copy = {
        ...item,
        sizing: size,
        amount: quantity,
      };
      await setDoc(doc(db, "cartItems", newId), copy);
      await updateDoc(doc(db, "cartItems", newId), {
        quantity: quantity + docSnapDuplicate.data().amount,
        amount: quantity + docSnapDuplicate.data().amount,
      });
      setCheckOut(true);
      setLoading(false);

      //SAME ITEM SAME SIZE
    } else {
      console.log("In cart");
      console.log(docSnap.data().amount);
      await updateDoc(doc(db, "cartItems", params.id), {
        quantity: quantity + docSnap.data().amount,
        amount: quantity + docSnap.data().amount,
      });
      setCheckOut(true);
      setLoading(false);
    }
  };

  //Delete
  const deleteWishlist = async (id) => {
    if (window.confirm("Remove from wishlist?")) {
      await deleteDoc(doc(db, "wishlist", id));

      console.log("Deleted");
    } else {
      console.log("Not deleted");
    }
  };

  //Add to wishlist
  const onclick = async () => {
    if (auth.currentUser) {
      if (wishlist === true) {
        setWishlist(!wishlist);
        deleteWishlist(id);
      } else {
        setWishlist(!wishlist);
        const dataCopy = {
          ...item,
          timestamp: serverTimestamp(),
          userRef: auth.currentUser.uid,
        };
        await setDoc(doc(db, "wishlist", id), dataCopy);
        console.log("added to wishlist");
      }
    } else {
      alert("Must be signed in to add to wishlist");
    }
  };

  //Check if item is in wishlist
  useEffect(() => {
    const itemInWishlist = async () => {
      const docRef = doc(db, "wishlist", id);
      const docSnap = await getDoc(docRef);
      const userRef = docSnap.data()?.userRef;
      if (auth.currentUser.uid === userRef) {
        setWishlist(true);
      } else {
        setWishlist(false);
      }
    };
    itemInWishlist();
  }, []);

  return (
    <div id="page-container">
      <div id="content-wrap">
        <div className="animate__animated animate__fadeIn m-auto lg:my-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center w-[21rem] lg:w-[60rem] lg:h-[60vh] bg-[#eeeff3] relative rounded shadow-lg">
          <div className="">
            <figure>
              <img
                className=" w-full m-auto lg:w-80 lg:ml-7 border border-indigo-100 rounded-lg shadow-xl"
                src={item?.image[0]}
                alt="selected item"
              />
            </figure>
          </div>
          <div className="flex flex-col lg:h-[36rem] relative">
            {/* Wishlist btn */}
            <button
              onClick={onclick}
              className="top-[-31rem] right-7 lg:right-2 lg:top-5 absolute text-2xl lg:text-xl text-neutral"
            >
              {!wishlist ? (
                <i className="fa-regular fa-heart" />
              ) : (
                <i className="fa-solid fa-heart" />
              )}
            </button>

            <h3 className="text-4xl pl-3 lg:pl-0 lg:mt-40 text-neutral font-bold mb-3">
              {item?.title}
            </h3>
            <p className="text-2xl pl-3 lg:pl-0 text-neutral mb-3">
              ${item?.price}
            </p>
            {/* QUANTITY */}
            <div className="text-lg font-bold text-neutral border border-primary flex justify-around w-24 mb-5 ml-3 lg:ml-0">
              <div
                onClick={() => adjustQuantity(-1)}
                className="border-r border-primary text-sm px-1 pr-3 w-6 flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-minus" />
              </div>
              <p>{quantity}</p>
              <div
                onClick={() => adjustQuantity(1)}
                className="border-l border-primary text-sm px-1 pl-2 w-6 flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-plus" />
              </div>
            </div>

            <div>
              {/* DESKTOP SIZE START */}
              <select
                className=" hidden sm:block md:block lg:block xl:block rounded  lg:ml-0 shadow-lg badge-outline border lg:w-72 flex justify-between py-3 pl-2 cursor-pointer text-lg bg-gray-100"
                onClick={(e) => handleClick(e.target.value)}
              >
                <option value="Size">Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
              </select>
              {/* END */}

              {/* MOBILE SIZE START */}
              <div className="flex ml-3 gap-3 pb-2 sm:hidden md:hidden lg:hidden xl:hidden">
                <button
                  onClick={() => handleClick("Small")}
                  className={
                    size === "Small"
                      ? "btn bg-indigo-600 border-0 text-white rounded-3xl"
                      : "btn bg-indigo-300 border-0 text-white rounded-3xl"
                  }
                >
                  SM
                </button>
                <button
                  onClick={() => handleClick("Medium")}
                  className={
                    size === "Medium"
                      ? "btn bg-indigo-600 border-0 text-white rounded-3xl"
                      : "btn bg-indigo-300 border-0 text-white rounded-3xl"
                  }
                >
                  MD
                </button>
                <button
                  onClick={() => handleClick("Large")}
                  className={
                    size === "Large"
                      ? "btn bg-indigo-600 border-0 text-white rounded-3xl"
                      : "btn bg-indigo-300 border-0 text-white rounded-3xl"
                  }
                >
                  LG
                </button>
                <button
                  onClick={() => handleClick("XL")}
                  className={
                    size === "XL"
                      ? "btn bg-indigo-600 border-0 text-white rounded-3xl"
                      : "btn bg-indigo-300 border-0 text-white rounded-3xl"
                  }
                >
                  XL
                </button>
              </div>
              {/* END */}
            </div>

            <button
              className="btn w-40 my-3 lg:ml-0 ml-3 lg:w-72 lg:mt-3 shadow-lg bg-indigo-400 border-0"
              onClick={() => handleAddToCart(params.id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemCard;
