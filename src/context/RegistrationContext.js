import { createContext, useState } from "react";
const DEFAULT_USER = {
  email: "",
  password: "",
  plan: "",
  plans: [],
};
const RegContext = createContext(DEFAULT_USER);
const RegistrationProvider = ({ children }) => {
  const [email, setEmail] = useState(DEFAULT_USER.email);
  const [password, setPassword] = useState(DEFAULT_USER.password);
  const [plan, setPlan] = useState(DEFAULT_USER.plan);
  const [getPlans, setGetPlans] = useState(DEFAULT_USER.plans);
  console.log(plan, password, email);
  return (
    <RegContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        plan,
        setPlan,
        getPlans,
        setGetPlans,
      }}
    >
      {children}
    </RegContext.Provider>
  );
};
export default RegContext;
export { RegistrationProvider };
