import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom" 

export default function Signup() {
  const [ username, setUsername ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ password, setPassword ] = useState("")

  const navigate = useNavigate()

  return <div className="h-screen bg-slate-400 flex justify-center items-center">
    <div className="w-80 bg-white h-max text-center rounded-lg p-2 px-4">
      <Heading label="Sign up"/>
      <SubHeading label="Enter your information to create your account"/>

      <InputBox onChangeHandler={(e) => {
        setUsername(e.target.value)
      }} placeHolder="ismail@gmail.com" label="Username"/>

      <InputBox onChangeHandler={(e) => {
        setFirstName(e.target.value)
      }} placeHolder="Mohammed" label="First Name"/>

      <InputBox onChangeHandler={(e) => {
        setLastName(e.target.value)
      }} placeHolder="ismail" label="Last Name"/>

      <InputBox onChangeHandler={(e) => {
        setPassword(e.target.value)
      }} placeHolder="********" label="Password"/>

      <Button onClickHandler={async () => {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", 
          {
            username,
            firstName,
            lastName,
            password
          },
        )
        if (response.status == 200) {
          localStorage.setItem("Authorization", response.data.token)
          navigate('/dashboard')
        }
      }} label="Sign up"/>

      <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin"/>
    </div>
  </div>
}