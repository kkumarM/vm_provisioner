import "./App.css";
import Login from "./components/common/Login";
import Home from "./components/Home/HomePage";
// import PrivateRoute from "./PrivateRoute";
import { Route, Routes } from "react-router-dom";
import { useSelectot } from "react-redux";


function App() {
  return (
	  <Routes>
		<Route path="/"  element={<Home/>}></Route>
		<Route path="/login"  element={<Login/>}></Route>
	</Routes>
  );
}

export default App;
