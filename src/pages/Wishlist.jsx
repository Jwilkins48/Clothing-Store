import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    const fetchCheckOut = async () => {
      try {
        const checkOutRef = collection(db, "wishlist");
        const q = query(
          checkOutRef,
          where("userRef", "==", auth.currentUser.uid)
        );
        const checkOutSnap = await getDocs(q);
        //Giving each item id/data
        const wishlist = [];
        checkOutSnap.forEach((doc) => {
          return wishlist.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setWishlist(wishlist);
        console.log(wishlist);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCheckOut();
  }, []);

  const deleteWishlist = async (id) => {
    if (window.confirm("Remove from wishlist?")) {
      await deleteDoc(doc(db, "wishlist", id));

      const updatedCart = wishlist.filter((item) => item.id !== id);
      setWishlist(updatedCart);
      setLoading(false);
      console.log("Deleted");
    }
  };

  return (
    <div className="mt-20">
      <header className="text-center mt-3 font-bold text-blue-400 wishlist">
        <h1>Wishlist</h1>
      </header>
      <div className="divider lg:w-[50rem] lg:mx-auto mx-8">
        <i className="fa-regular text-yellow-400 fa-heart" />
      </div>
      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {wishlist?.map((items) => (
            <Card
              onDelete={deleteWishlist}
              clothing={items.data}
              id={items.id}
              key={items.id}
              InWishlist={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[20rem]">
          <p className="text-3xl mb-5 font-bold text-neutral">
            Your Wishlist Is Empty
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

export default Wishlist;
