// login-test.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../actions/loginAction"


const Login = () => {
	const dispatch = useDispatch();
	const [state, setState] = React.useState({
	username: "",
	password: "",
	isChecked: false,

	});

	const handleUsername = (e) => {
	setState({ ...state, username: e.target.value });
	};

	const handlePassword = (e) => {
	setState({ ...state, password: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("username");
		console.log(state.username);
		let user_data = {
		username: state.username,
		password: state.password,
		};
    dispatch(loginActions.setLoginDetails(user_data));
    dispatch(loginActions.verifyLogin(user_data));
	}
	return (

    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            {/* <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label> */}
            <input
              type="text"
              id="username"
              //name="username"
			  value={state.username}
			  onChange={handleUsername}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            {/* <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label> */}
            <input
              type="password"
              id="password"
              name="password"
			  value={state.password}
			  onChange={handlePassword}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={(e) => {
		handleSubmit(e); }}      
		>
                Sign In
              </button>
            </div>
            <div>
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


