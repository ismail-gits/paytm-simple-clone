import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckAuth() {
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("Authorization")
      }
    })
    .then(response => {
      navigate('/dashboard')
    })
    .catch(err => {
      navigate('/signin')
    })
  }, [])
  }