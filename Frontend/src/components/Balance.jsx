export function Balance({amount}) {
  return <div className="flex">
    <div className="text-lg font-bold">Your Balance: </div>
    <div className="text-lg font-semibold text-blue-500 ml-2">₹ {amount}</div>
  </div>
}