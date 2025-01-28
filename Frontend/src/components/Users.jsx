import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"

export function Users({USERS, placeholder, onInputHandler}) {
  return <div className="my-2 mx-4">
    <div className="text-lg font-bold mb-2">Users</div>
    <div>
      <input className="border border-slate-500 rounded w-full p-1 mx-1 mb-3" type="text" placeholder={placeholder} onInput={onInputHandler}/>
    </div>
    
    {USERS.map(user => <User user={user} />)}
  </div>
}

function User({user}) {
  const navigate = useNavigate()

  return <div className="flex justify-between items-center">
    <div className="flex items-center">
      <div className="rounded-full bg-blue-500 h-10 w-10 my-2 ml-4 mr-4 flex justify-center">
        <div className="flex items-center text-2xl font-bold text-white">{user.firstName.toUpperCase()[0]}</div>
      </div>
      <div className="text-lg font-semibold">{user.firstName} {user.lastName}</div>
    </div>
    <div className="mr-4">
      <Button onClickHandler={() => {
        navigate(`/send?id=${user._id}&name=${user.firstName}`)
      }} label={"Send Money"}/>
    </div>
  </div>
}