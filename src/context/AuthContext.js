import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:
    {
      profilePicture: "",
      coverPicture: "",
      friends: [],
      isAdmin: false,
      _id: "642ea9ec0db91400408f5c75",
      username: "March",
      email: "tester@gmail.com",
      password: "$2a$12$vHtjwjhnCG7HUXZTGJRkguLgOn62QJiN2Sa0ALRIfXs1xT4uKDcKe",
      createdAt: "2023-04-06T11:15:56.177Z",
      updatedAt: "2023-04-06T11:15:56.177Z",
      __v: 0,
    } || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  console.log(localStorage.setItem("user", JSON.stringify(state.user)));

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
