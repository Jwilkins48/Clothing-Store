import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //If user account exists sign in and redirect home
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log("No User");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className=" lg:p-12 lg:py-20 lg:rounded-xl">
          <form
            className="w-[22rem] bg-primary h-[20rem] rounded-lg border border-base-300 shadow-xl p-3 m-2 bg- flex flex-col"
            onSubmit={onSubmit}
          >
            {/* SIGN IN / SIGN OUT */}
            <header className="grid grid-cols-3 my-2 justify-center items-center text-center signIn">
              <h1 className="font-bold text-yellow-200 ml-2 text-xl">
                Sign in
              </h1>
              <div className="w-20 text-primary text-center mx-auto divider">
                <i className="fa-regular text-yellow-200 fa-heart" />
              </div>

              <Link className="text-xl text-secondary mr-2" to="/sign-up">
                Sign up
              </Link>
            </header>
            {/* EMAIL */}
            <div className="emailDiv">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                id="email"
                className="input text-green-600 font-bold input-bordered input-primary-focus w-full "
              />
            </div>
            {/* PASSWORD */}
            <div className="passwordDiv my-4 flex relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChange}
                id="password"
                placeholder="Password"
                className="input input-bordered text-green-600 font-bold input-primary-focus w-full "
              />
              {/* SHOW PASSWORD */}
              <div
                className="absolute right-5 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa-regular text-green-600 font-bold fa-eye-slash" />
                ) : (
                  <i className="fa-regular text-green-600 font-bold fa-eye" />
                )}
              </div>
            </div>
            <Link
              to="/forgotPassword"
              className="text-secondary mb-5 font-bold ml-2"
            >
              Forgot Password?
            </Link>
            {/* ON SUBMIT */}
            <button
              className="btn bg-yellow-200 text-gray-500 border-0"
              onClick={onChange}
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
