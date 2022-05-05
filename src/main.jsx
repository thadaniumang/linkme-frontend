import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Logo from './logo.png'

ReactDOM.render(    
  <BrowserRouter>
    <RecoilRoot>
      <div className="text-center w-full mt-3">
        <img src={Logo} alt="LinkME" className='mx-auto' />
      </div>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
)
