import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const navigate = useNavigate()

  return <div className="h-screen bg-slate-400 flex justify-center items-center">
    <div className="w-80 bg-white h-max text-center rounded-lg p-2 px-4">
      <Heading label="Sign in"/>
      <SubHeading label="Enter your information to create your account"/>

      <InputBox onChangeHandler={(e) => {
        setUsername(e.target.value)
      }} placeHolder="ismail@gmail.com" label="Username"/>

      <InputBox onChangeHandler={(e) => {
        setPassword(e.target.value)
      }} placeHolder="********" label="Password"/>

      <Button onClickHandler={async () => {
        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
          username,
          password
        })

        if (response.status == 200) {
          localStorage.setItem("Authorization", response.data.token)
          navigate('/dashboard')
        }
      }} label="Sign in"/>
      <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup"/>
    </div>
  </div>
}