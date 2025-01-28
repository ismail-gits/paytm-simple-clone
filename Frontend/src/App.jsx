import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"

const Signin = lazy(() => import("./pages/Signin"))
const Signup = lazy(() => import("./pages/Signup"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Send = lazy(() => import("./pages/Send"))
const CheckAuth = lazy(() => import("./pages/CheckAuth"))

function App() {
  return <>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckAuth/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<Send/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}

export default App