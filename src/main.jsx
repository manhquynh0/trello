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

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor = {persistor}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
          <ToastContainer />
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
