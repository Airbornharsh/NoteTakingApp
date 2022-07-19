import React, { useState } from "react";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import config from "../config";
import BackButton from "../Button/BackButton";

const stripePromise = loadStripe(`${config.STRIPE_KEY}`);

const BillingForm = (props) => (
  <Elements stripe={stripePromise}>
    <Child {...props} />
  </Elements>
);

const Child = () => {
  const Navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [storage, setStorage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return (
      stripe && elements && name !== "" && storage !== "" && isCardComplete
    );
  };

  const billUser = (details) => {
    return API.post("notes", "/billing", {
      body: details,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    setIsProcessing(false);

    if (error) {
      alert(error);
      return;
    }
    setIsLoading(true);

    try {
      await billUser({ storage: storage, source: token.id });
      alert("Your Card Has Been Charged Successfully");
      Navigate("/");
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
              <CardElement
                onChange={(e) => {
                  setIsCardComplete(e.complete);
                }}
              />
            </li>
          </ul>
          <span
            className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded`}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="ml-2 rotation" />
            ) : (
              ""
            )}
            <button className="px-2 py-1 " disabled={!validateForm()}>
              Submit
            </button>
          </span>
        </form>
      </div>
      <BackButton to={"/settings"} />
      {isProcessing && (
        <div className="fixed top-0 left-0 h-[100vh] w-screen bg-[rgba(0,0,0,0.3)] z-30 flex justify-center items-center">
          <span className="loader">
            <AiOutlineLoading3Quarters
              size="5rem"
              color="rgba(0,0,0,0.7)"
              className="ml-2 rotation"
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default BillingForm;
