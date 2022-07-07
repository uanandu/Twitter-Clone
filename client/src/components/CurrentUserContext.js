import { createContext, useEffect, useReducer } from "react";

const initialState = {
  currentUser: null,
  status: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
    // console.log("Inside switch", action.currentUser)
      return {
        ...state,
        currentUser: action.currentUser,
        status: "idle",
      };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
    //   .then((data) => console.log(data.profile))
        .then (data => currentUserUpdate(data.profile))
      .catch((err) => console.log(err));
  }, []);

  const currentUserUpdate = (data) => {
    // console.log(data.handle)
    dispatch({ type: "SET_CURRENT_USER", currentUser: data.handle });
  };

  return (
    <CurrentUserContext.Provider value={{state, actions:{currentUserUpdate}}}>
      {children}
    </CurrentUserContext.Provider>
  );
};
