export function InputBox({label, placeHolder, onChangeHandler}) {
  return <div>
    <div className="text-sm font-medium text-left py-2">{label}</div>
    <div>
      <input onChange={onChangeHandler} className="text-slate-500 border rounded w-full border-slate-500 px-2 py-1" type="text" placeholder={placeHolder}/>
    </div>
  </div>
}