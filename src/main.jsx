import React, { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
// สร้าง AuthContext สำหรับ Provide isAuth,handleAuth
const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ name: "Guest" });

  // isAuth : false => true ให้ delay 1 วิ
  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);
  //   }
  // }, [isLoading]);

  // const handleAuth = () => {
  //   // login : isAuth : false => true
  //   if (!isAuth) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsAuth(true);
  //       setIsLoading(false);
  //     }, 3000);
  //   } else {
  //     setIsAuth(false);
  //   }
  // };

  const handleAuth = async () => {
    // Login => Logout
    if (isAuth) {
      setIsAuth(false);
      setUser({ name: "Guest" });
      return;
    }
    //  Logout => Login
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/2"
      );
      console.log(response.data);
      setUser(response.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // const shareObj = { isAuth, handleAuth };
  return (
    <AuthContext.Provider value={{ isAuth, handleAuth, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  const { isAuth, handleAuth, isLoading, user } = useContext(AuthContext);

  return (
    <div className="App">
      {isLoading ? (
        <h1>loading ...</h1>
      ) : (
        <h1>Welcome.. {!isAuth ? "Guest" : user?.name} </h1>
      )}
      <button disabled={isLoading} onClick={handleAuth}>
        {!isAuth ? "Login" : "Logout"}
      </button>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />;
  </AuthContextProvider>
);
{
  /*
  <h1>Welcome.. Guest</h1>
  <button>Login</button>
  */
}
