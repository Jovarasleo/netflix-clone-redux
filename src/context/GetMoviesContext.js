import { createContext, useState } from "react";
const DEFAULT_MOVIES = {
  load: true,
  error: null,
  list: [],
};
console.log(DEFAULT_MOVIES.listLoading);
const GetMoviesContext = createContext(DEFAULT_MOVIES);
const GetMoviesProvider = ({ children }) => {
  const [load, setLoad] = useState(DEFAULT_MOVIES.load);
  const [list, setList] = useState(DEFAULT_MOVIES.list);
  const [error, setError] = useState(DEFAULT_MOVIES.error);
  return (
    <GetMoviesContext.Provider
      value={{ list, setList, load, setLoad, error, setError }}
    >
      {children}
    </GetMoviesContext.Provider>
  );
};
export default GetMoviesContext;
export { GetMoviesProvider };
