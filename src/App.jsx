import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RecoilRoot from 'recoil'

import Lists from './LinkMe/Lists.jsx'
import Links from './LinkMe/Links.jsx'
import CreateLink from './LinkMe/CreateLink.jsx'
import Register from './Authentication/Register.jsx'
import Login from './Authentication/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Lists />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/:username/:list" element={<Links />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
