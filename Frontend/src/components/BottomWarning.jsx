import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
  return <div className="text-sm flex justify-center font-medium m-2">
    <div>{label}</div>
    <Link className="underline pl-1 cursor-pointer" to={to}>{buttonText}</Link>
  </div>
}