import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './redux/store'
// Cau hinh redux store
import { Provider } from 'react-redux'
// Cau hinh react-router-dom
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import {
  persistStore
} from 'redux-persist'

const persistor = persistStore(store)
// Kỹ thuật Inject Store
import { injectStore } from '~/utils/authorizeAxios'
injectStore(store)

import { io } from 'socket.io-client'
import { API_ROOT } from './utils/constants'
export const socketIoInstance = io(API_ROOT)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
          <ToastContainer />
        </CssVarsProvider>
      </BrowserRouter >
    </PersistGate>
  </Provider>
)
