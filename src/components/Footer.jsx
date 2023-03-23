import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer pl-2 pb-4 lg:py-8 lg:pl-[25%] bg-base-200 text-base-content ">
      <div className="flex gap-6 mx-auto mt-10 lg:mx-0">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>

        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
      <div>
        <div className="form-control w-80">
          <span className="footer-title">Newsletter</span>
          <div className="relative">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered w-full pr-16"
            />
            <button
              onClick={() => navigate("/Newsletter")}
              className="btn btn-primary absolute top-0 right-0 rounded-l-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
