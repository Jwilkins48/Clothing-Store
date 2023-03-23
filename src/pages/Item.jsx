import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import ItemCard from "../components/ItemCard";

function Item({ checkOut, setCheckOut }) {
  const navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  //Fetch clothing with matching id
  useEffect(() => {
    const fetchClothes = async () => {
      const itemRef = doc(db, "clothing", params.id);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        setItem(itemSnap.data());
        setQuantity(itemSnap.data().quantity);
        setLoading(false);
      }
    };
    fetchClothes();
  }, [params.id]);

  return (
    <div className="">
      <div className="mt-20 ml-8 mb-2 lg:mt-32 lg:ml-20  font-bold opacity-[.8] text-lg text-neutral">
        <button onClick={() => navigate("/shop/mens/shirt")}>
          <i className="fa-solid fa-angle-left"></i> Back To Shop
        </button>
      </div>

      <ItemCard
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        item={item}
        quantity={quantity}
        setQuantity={setQuantity}
        id={params.id}
        key={params.id}
      />
    </div>
  );
}

export default Item;
