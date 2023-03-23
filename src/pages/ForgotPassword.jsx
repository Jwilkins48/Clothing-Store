import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alert("Sent");
    } catch (error) {
      console.log("cant reset email");
    }
  };

  return (
    <div className="mt-20 lg:mt-0 md:mt-0 lg:h-screen md:flex md:h-screen lg:flex flex-col justify-center items-center">
      <header>
        <h1 className="text-4xl my-4 ml-3 lg:mr-6 text-neutral font-bold underline">
          Forgot Password
        </h1>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            className="input font-bold bg-secondary input-bordered ml-2 input-primary-focus w-80 "
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="flex hover:text-primary text-xl">
            <div className="signInText ml-3 mt-3 cursor-pointer">
              Send Reset Link{" "}
            </div>
            <button className="signInButton">
              <i className=" fa-solid fa-arrow-right px-2 mt-4"></i>
            </button>
          </div>

          <Link className="ml-3 text-xl hover:text-secondary" to="/sign-in">
            Sign In
          </Link>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
