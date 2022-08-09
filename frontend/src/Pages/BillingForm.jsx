import React, { useState, useContext } from "react";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import SubmittingButton from "../Components/Button/SubmittingButton";
import config from "../config";
import BackButton from "../Components/Button/BackButton";
import Context from "../Context";

const BillingForm = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [storage, setStorage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const UserCtx = useContext(Context).user;

  // console.log(window.Razorpay);

  const validateForm = () => {
    return name !== "" && storage !== "";
  };

  const billUser = (details) => {
    return API.post("notes", "/billing", {
      body: details,
    });
  };

  const billVerify = (details) => {
    return API.post("notes", "/billing/verify", {
      body: details,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      console.log("before");
      const response = await billUser({
        storage: storage,
        emailId: UserCtx.userId,
      });
      console.log("started");
      const options = {
        key: config.RAZORPAY_KEY_ID,
        amount: response.amount,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        // image: "https://example.com/your_logo",
        order_id: response.orderId,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          response.emailId = UserCtx.userId;
          const verify = async () => {
            console.log("EARLY");
            try {
              const res = await billVerify(response);
              console.log(res);
              alert(res);
              Navigate("/");
            } catch (e) {
              console.log(e);
            }
          };
          verify();
        },
        prefill: {
          name: "name",
          email: "Harsh@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#bf21eb",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      const fields = rzp1.open();
      console.log(fields);
    } catch (e) {
      console.log(e.message);
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh]  w-screen flex items-center justify-center">
      <div className="bg-white min-w-[19rem] rounded-md w-[25rem] z-10">
        <form
          className="flex flex-col items-start py-12 ml-8"
          onSubmit={handleSubmit}
        >
          <ul>
            <li className="flex flex-col">
              <label htmlFor="email" className="text-[0.9rem] font-bold pl-1">
                Storage
              </label>
              <input
                autoFocus
                type="number"
                min="0"
                className="p-2 text-black rounded bg-gray-300 min-w-[15rem] h-10 mb-4"
                placeholder="Number of notes to store"
                value={storage}
                onChange={(e) => {
                  setStorage(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col">
              <label htmlFor="email" className="text-[0.9rem] font-bold  pl-1">
                CardHolder&apos;s Name
              </label>
              <input
                type="text"
                className="p-2 rounded text-black bg-gray-300 mb-4 w-[20rem]"
                placeholder="Name of the Card"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </li>
            <li className="mb-4 ">
              <label
                htmlFor="card-element"
                className="text-[0.9rem] font-bold  pl-1 mb-1"
              >
                Card Info
              </label>
            </li>
          </ul>
          <SubmittingButton
            name="Submit"
            loader={isLoading}
            validate={validateForm}
          />
        </form>
      </div>
      <BackButton to={"/settings"} />
    </div>
  );
};

export default BillingForm;
