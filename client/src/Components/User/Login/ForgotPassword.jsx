import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/jobi.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendLink = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/forgotPassword", { email: email });
      if (res.data === "Email send successfully") {
        setMessage(true);
      } else {
        setErrorMessage("Enter a valid mail");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <section class="admi min-h-screen flex items-center justify-center">
      <div class="bg-green-00 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center max-h-max">
        <div class="md:w-1/2 px-8 md:px-16">
          <img className="w-1/2 mx-auto " src={logo} alt="" />
          <h2 class="font-bold text-3xl text-[#002D74] text-center p-2">
            Reset Password
          </h2>
          {message && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">Check your mail</div>}

          <form onSubmit={sendLink} class="flex flex-col gap-4 p-2">
            <input
              class="p-2 mt-8 rounded-xl border text-center"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 ">
              Submit
            </button>
          </form>
          <div class="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <Link to="/login">
              <a className="flex justify-center">Back to Login?</a>
            </Link>
          </div>
          {errorMessage && (
            <div
              className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto"
              role="alert"
            >
              {" "}
              {errorMessage}
            </div>
          )}
        </div>

        <div class="md:block hidden w-1/2">
          <img
            class="rounded-3xl "
            src="https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg?w=1380&t=st=1667827093~exp=1667827693~hmac=09f6484512ffdd5ef5a855198b4fca98e1c2a2c5e0ec648a3dd9a34009778ad7"
          />
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
