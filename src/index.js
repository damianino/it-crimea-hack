import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from 'components/app'

import 'bootswatch/dist/quartz/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
