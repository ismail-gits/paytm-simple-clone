import { useSearchParams } from "react-router-dom"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { useState } from "react"
import axios from "axios"
import { useSetRecoilState } from "recoil"

export default function Send() {
  const [ amount, setAmount ] = useState("")
  const [ searchParams ] = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  return <div className="h-screen bg-slate-300 flex justify-center items-center">
    <div className="bg-white w-90 text-center rounded-lg p-2 px-4">
      <div className="font-bold text-3xl pt-6 mb-9">Send Money</div>

      <div className="">
        <User name={name}/>
      </div>
      <InputBox onChangeHandler={(e) => {
        setAmount(e.target.value)
      }} label={"Amount in INR"} placeHolder={"Enter Amount"}/>

      <div className="">
        <Button onClickHandler={() => {
          axios.post("http://localhost:3000/api/v1/account/transfer",
            {
              to: id,
              amount
            }, {
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("Authorization")
              }
            }
          )
          .then(response => {
            if (response.status == 200) {
              setBalance(response.data.balance)
            }
          })
        }} label={"Initate Transfer"}/>
      </div>
    </div>
  </div>
}

function User({name}) {
  return <div className="flex justify-center">
    <div className="flex items-center mr-8">
      <div className="rounded-full bg-blue-500 h-10 w-10 my-2 mr-4 flex justify-center">
        <div className="flex items-center text-2xl font-bold text-white">{name.toUpperCase()[0]}</div>
      </div>
      <div className="text-lg font-semibold">{name}</div>
    </div>
  </div>
}