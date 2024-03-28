import "./App.css";
import Login from "./components/Login/LoginPage";
import Home from "./components/Home/HomePage";
// import PrivateRoute from "./PrivateRoute";
import { Route, Routes } from "react-router-dom";
import { useSelectot } from "react-redux";


function App() {
  return (
	  <Routes>
		<Route path="/"  element={<Login/>}></Route>
		<Route path="/home"  element={<Home/>}></Route>
	</Routes>
  );
}

export default App;

