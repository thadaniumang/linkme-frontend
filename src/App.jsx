import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { user } from "./atoms";
import { useRecoilValue } from "recoil";

import Lists from './LinkMe/Lists.jsx'
import Links from './LinkMe/Links.jsx'
import CreateLink from './LinkMe/CreateLink.jsx'
import Register from './Authentication/Register.jsx'
import Login from './Authentication/Login.jsx'

function App() {

  const loggedInUser = useRecoilValue(user);

  return (
    <Routes>
      {
        !loggedInUser ? (
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (  
          <>
            <Route path="/" element={<Lists />} />
            <Route path="/create" element={<CreateLink />} />
            <Route path="/:username/:list" element={<Links />} />
          </>
        )
      }
    </Routes>
  )
}

export default App
