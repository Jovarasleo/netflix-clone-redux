import React, { useCallback, useEffect } from "react";
import { useContext } from "react";
import RegistrationContext from "../../../context/RegistrationContext";
import fetchAPI from "../../fetchAPI";
import "./index.css";
function PickPlan() {
  const { plan, setPlan, getPlans, setGetPlans } =
    useContext(RegistrationContext);

  const getSubscribtions = useCallback(async () => {
    const response = await fetchAPI.getData(
      "https://academy-video-api.herokuapp.com/sales/plans"
    );
    if (response.status === 200) {
      setGetPlans(response.data);
    }
  }, [setGetPlans]);
  useEffect(() => {
    getSubscribtions();
  }, [getSubscribtions]);
  return (
    <>
      <div className="plans">
        {getPlans?.map(({ id, title, monthlyCost, totalCost }) => {
          return (
            <div
              key={id}
              className="singlePlan"
              onClick={() => {
                setPlan(id);
              }}
            >
              <input
                className="selectPlanInput"
                type="radio"
                name="inputGroup"
                checked={plan === id ? true : false}
              />
              <label type="radio" htmlFor={id}>
                <h5>{title}</h5>
                <h4>{monthlyCost}$</h4>
                <p>Per Month</p>
                <div className="totalCost">
                  <p>{title.split(" ", 2)}</p>
                  <p>{totalCost}$</p>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default PickPlan;
