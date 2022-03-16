import React from "react";
import { NavLink } from "react-router-dom";

function StepIndicator() {
  const steps = [
    {
      path: "/checkout/cart",
      name: "Cart",
      key: 1,
    },
    {
      path: "/checkout/payment",
      name: "Payment",
      key: 2,
    },
    {
      path: "/checkout/confirm",
      name: "Confirm",
      key: 3,
    },
  ];

  function handleStop(e) {
    e.preventDefault();
  }

  return (
    <div className="stepIndicator">
      {steps.map((step) => {
        return (
          <>
            <div className="dot-label">
              <NavLink
                key={step.key}
                to={step.path}
                onClick={handleStop}
              ></NavLink>
              <p>{step.name}</p>
              
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
}

export default StepIndicator;
