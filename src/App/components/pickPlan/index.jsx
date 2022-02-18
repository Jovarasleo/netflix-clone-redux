import React, { useCallback, useState, useEffect, useRef } from "react";
import { useContext } from "react";
import RegistrationContext from "../../../context/RegistrationContext";
import fetchAPI from "../../fetchAPI";
import Button from "../button";
import "./index.css";
function PickPlan() {
  const { plan, setPlan, getPlans, setGetPlans } =
    useContext(RegistrationContext);
  const getSubscribtions = useCallback(async () => {
    const response = await fetchAPI.getData(
      "https://academy-video-api.herokuapp.com/sales/plans"
    );
    console.log(response);
    if (response.status === 200) {
      console.log(response.data);
      setGetPlans(response.data);
    }
  }, [setGetPlans]);
  useEffect(() => {
    getSubscribtions();
  }, [getSubscribtions]);
  return (
    <>
      <div className="plans">
        {console.log("plans:", getPlans)}

        {getPlans?.map(({ id, title, monthlyCost, totalCost }) => {
          return (
            <div key={id} className="singlePlan">
              <input
                type="radio"
                name="inputGroup"
                onChange={() => {
                  setPlan(id);
                }}
                checked={plan === id ? true : false}
              />
              <label type="radio" htmlFor={id}>
                <h6>{title}</h6>
                <h4>{monthlyCost}</h4>
                <p>Per Month</p>
                <p>{totalCost}</p>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default PickPlan;
