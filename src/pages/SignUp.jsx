import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = formData;
  const navigate = useNavigate();

  //Create User Account
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        //Create user with form info
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        updateProfile(auth.currentUser, { displayName: name });

        //copy of user info with password removed
        const formDataCopy = { ...formData };
        delete formDataCopy.password;

        //Placing user info into users collection
        await setDoc(doc(db, "users", user.uid), formDataCopy);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords must match");
    }

    if (password.length < 6) {
      alert("Password must be greater than 6 characters");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="flex h-[92.4vh] justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-[23rem] bg-primary h-[27rem] rounded-lg border border-base-300 shadow-xl p-3 m-2 bg- flex flex-col"
      >
        {/* SIGN IN / SIGN UP */}
        <header className="grid grid-cols-3 my-2 justify-center items-center text-center signIn">
          <Link className="text-xl text-secondary mr-2" to="/sign-in">
            Sign in
          </Link>
          <div className="w-20 text-primary text-center mx-auto divider">
            <i className="fa-regular text-yellow-200 fa-heart" />
          </div>
          <h1 className="font-bold text-yellow-200 ml-2 text-xl">Sign up</h1>
        </header>

        {/* USER NAME */}
        <div className="flex flex-col gap-4 h-24 justify-around">
          <div>
            <input
              placeholder="Name"
              className="input text-[#1f6d3c] font-bold bg-base-100 border border-gray-300 w-full mt-1  "
              onChange={onChange}
              type="text"
              id="name"
              value={name}
            />
          </div>
          {/* EMAIL*/}
          <div>
            <input
              placeholder="Email"
              className="input text-[#1f6d3c] font-bold bg-base-100 border border-gray-300  w-full mt-1"
              onChange={onChange}
              type="text"
              id="email"
              value={email}
            />
          </div>
          {/* PASSWORD */}
          <div className="flex flex-col">
            <div className="relative">
              <input
                placeholder="Password"
                className="input text-[#1f6d3c] font-bold bg-base-100 border border-gray-300  w-full mt-1 "
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
              />
              {/* SHOW PASSWORD */}
              <p onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <i className="fa-regular text-[#1f6d3c] font-bold fa-eye absolute top-5 right-5 " />
                ) : (
                  <i className="fa-solid text-[#1f6d3c] font-bold fa-eye-slash absolute top-5 right-5 " />
                )}
              </p>
            </div>
            {/* CONFIRM PASSWORD */}
            <input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              className="input text-[#1f6d3c] font-bold bg-base-100 border border-gray-300 w-full mt-4 "
              type={showPassword ? "text" : "password"}
            />
          </div>
          {/* SUBMIT */}
          <button className="btn bg-yellow-200 text-gray-500 border-0 mt-1">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
