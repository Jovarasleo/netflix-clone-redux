import { createContext, useState } from "react";
const DEFAULT_MOVIES = {
  listLoading: false,
  listError: null,
  list: [],
};
const GetMoviesContext = createContext(DEFAULT_MOVIES);
const GetMoviesProvider = ({ children }) => {
  const [list, setList] = useState(DEFAULT_MOVIES.list);
  const [listLoading, setLoading] = useState(DEFAULT_MOVIES.loading);
  const [listError, setError] = useState(DEFAULT_MOVIES.error);
  return (
    <GetMoviesContext.Provider
      value={{ list, setList, listLoading, setLoading, listError, setError }}
    >
      {children}
    </GetMoviesContext.Provider>
  );
};
export default GetMoviesContext;
export { GetMoviesProvider };
