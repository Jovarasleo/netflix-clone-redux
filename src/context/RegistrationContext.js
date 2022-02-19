import { createContext, useState } from "react";
const DEFAULT_USER = {
  email: "",
  password: "",
  password2: "",
  plan: "",
  plans: [],
  error: null,
};
const RegContext = createContext(DEFAULT_USER);
const RegistrationProvider = ({ children }) => {
  const [email, setEmail] = useState(DEFAULT_USER.email);
  const [password, setPassword] = useState(DEFAULT_USER.password);
  const [password2, setPassword2] = useState(DEFAULT_USER.password);
  const [plan, setPlan] = useState(DEFAULT_USER.plan);
  const [getPlans, setGetPlans] = useState(DEFAULT_USER.plans);
  const [error, setError] = useState(DEFAULT_USER.error);
  console.log(plan, password, email, error);
  return (
    <RegContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        password2,
        setPassword2,
        plan,
        setPlan,
        getPlans,
        setGetPlans,
        error,
        setError,
      }}
    >
      {children}
    </RegContext.Provider>
  );
};
export default RegContext;
export { RegistrationProvider };
