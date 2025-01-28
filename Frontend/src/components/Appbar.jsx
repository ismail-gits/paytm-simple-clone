export function AppBar({logo, message, alphabet}) {
  return <div className="flex h-16 justify-between shadow items-center">
    <div className="text-2xl font-semibold ml-6 text-blue-500">{logo}</div>
    <div className="flex justify-end items-center">
      <div className="text-lg font-semibold">{message}</div>
      <div className="rounded-full bg-blue-500 h-12 w-12 my-2 ml-4 mr-6 flex justify-center">
        <div className="flex items-center text-2xl font-bold text-white">{alphabet}</div>
      </div>
    </div>
  </div>
}