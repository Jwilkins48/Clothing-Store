import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

function Navbar({ checkOut, setCheckOut }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [cart, setCart] = useState(null);

  //Close daisy dropdown tab on click
  const handleClick = (path) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    navigate(path);
  };

  //Sign out current user
  const onLogout = () => {
    auth.signOut();
    navigate("/");
    alert("Signed Out!");
  };

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
        cart?.length > 0 ? setCheckOut(true) : setCheckOut(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCheckOut();
  }, []);

  return (
    <div
      className={
        "navbar scrollNav bg-primary shadow-2xl flex items-center justify-between fixed z-20 opacity-[.9] top-0"
      }
    >
      <div className="hidden sm:block md:block lg:block ">
        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className="btn btn-ghost normal-case text-accent text-lg"
            onClick={() => navigate("/shop/mens/shirt")}
          >
            Mens
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box w-52 app font-bold text-lg"
          >
            <li>
              <a onClick={() => navigate("/shop/mens/shirt")}>Tops</a>
            </li>
            <li>
              <a onClick={() => navigate("/shop/mens/bottoms")}>Bottoms</a>
            </li>
            <li>
              <a onClick={() => navigate("/shop/mens/jacket")}>
                Jackets & Coats
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/shop/mens/dress-shirt")}>
                Button Down Shirts
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className="btn btn-ghost normal-case text-accent text-lg"
            onClick={() => navigate("/shop/women/tops")}
          >
            Womens
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu  bg-base-200 rounded-box w-52 app font-bold text-lg"
          >
            <li>
              <a onClick={() => navigate("/shop/women/tops")}>Tops</a>
            </li>
            <li>
              <a onClick={() => navigate("/shop/women/bottoms")}>Bottoms</a>
            </li>
            <li>
              <a onClick={() => navigate("/shop/women/dresses")}>Dresses</a>
            </li>
            <li>
              <a onClick={() => navigate("/shop/women/jacket")}>
                Jackets & Coats
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-accent text-3xl lg:mr-20"
        >
          Daisies
        </a>
      </div>
      <div className="mr-2">
        {/* WISHLIST */}
        <button
          onClick={() => navigate("/wishlist")}
          className="btn btn-ghost btn-circle text-accent text-lg"
        >
          <i className="fa-solid fa-heart" />
        </button>
        {/* USER  */}
        <div
          onClick={() => setDropdown(!dropdown)}
          className="dropdown dropdown-end "
        >
          <label tabIndex={0} className="btn btn-ghost btn-circle text-accent">
            <div className="w-10 rounded-full flex items-center justify-center text-lg">
              <i className="fa-regular fa-user " />
            </div>
          </label>
          {/* If user is signed in show log out option, otherwise sign in */}
          {auth.currentUser ? (
            <ul
              tabIndex={0}
              className={
                dropdown
                  ? "menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  : "hidden"
              }
            >
              {/* USER */}
              <li onClick={onLogout}>
                <a>Logout</a>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className={
                dropdown
                  ? "menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  : "hidden"
              }
            >
              {/* NO USER */}
              <li>
                <a
                  onClick={() => handleClick("/sign-in")}
                  className="justify-between"
                >
                  Sign In
                </a>
              </li>
              <li>
                <a onClick={() => handleClick("/sign-up")}>Sign Up</a>
              </li>
            </ul>
          )}
        </div>
        {/* SHOPPING CART */}
        <div
          className="dropdown dropdown-end"
          onClick={() => handleClick("/check-out")}
        >
          <label tabIndex={0} className="btn btn-ghost btn-circle text-accent">
            <div className="indicator ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge w-5 h-5 badge-sm indicator-item bg-secondary text-primary border-blue-300">
                {checkOut > 0 ? "!" : 0}
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
