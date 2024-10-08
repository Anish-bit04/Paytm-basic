import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Signup = ({setisAuthenticated}) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SignupBtn = async () => {
    const response = await axios.post(
      "https://cashflow-backend-c0fr.onrender.com/api/v1/user/signup",
      {
        username,
        firstName,
        lastName,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    setisAuthenticated(true)
    navigate("/dashboard");
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            placeholder="Anish"
            label={"First Name"}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <InputBox
            placeholder="Choudhary"
            label={"Last Name"}
            onChange={(e) => setlastName(e.target.value)}
          />
          <InputBox
            placeholder="anishb2041@gmail.com"
            label={"Email"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={SignupBtn}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
export default Signup;
