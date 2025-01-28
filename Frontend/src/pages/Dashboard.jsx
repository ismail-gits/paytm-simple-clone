import { useEffect, useState } from "react";
import { AppBar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useRecoilState } from "recoil";

export default function Dashboard() {
  const [ users, setUsers ] = useState([])
  const [ filter, setFilter ] = useState("")
  const [ balance, setBalance ] = useState("")

  const token = `Bearer ${localStorage.getItem("Authorization")}`

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
      headers: {
        "Authorization": token
      }
    })
    .then(response => {
      setUsers(response.data.users)
    })
  }, [filter])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/account/balance`, {
      headers: {
        "Authorization": token
      }
    })
    .then(response => {
      const balance = Number(response.data.balance).toFixed(2)
      setBalance(balance)
    })
  }, [balance])

  return <div>
    <div>
      <AppBar logo={"PayTM"} message={"Hello"} alphabet={"I"}/>
    </div>
    <div className="m-4">
      <Balance amount={balance}/>
    </div>

    <div>
      <Users onInputHandler={(e) => {
        setFilter(e.target.value)
      }} placeholder={"Search users..."} to={"send"} fullName={"Mohammed Arsalaan"} USERS={users}/>
    </div>
  </div>
}