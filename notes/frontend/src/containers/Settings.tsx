import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";

import config from "../config";
import BillingForm from "../components/BillingForm";
import { onError } from "../lib/errorLib";

import "./Settings.css";

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const stripePromise = loadStripe(config.STRIPE_KEY);

  function billUser(details: any) {
    return API.post("notes", "/dues", {
      body: details,
    });
  }

  async function handleFormSubmit(storage: any, { token, error }: { token: any, error: any }) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id,
      });

      alert("Your card has been charged successfully!");
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      <Elements
        stripe={stripePromise}
        // fonts={[
        //   {
        //     cssSrc:
        //       "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800",
        //   },
        // ]}
      >
        <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
      </Elements>
    </div>
  );
}
