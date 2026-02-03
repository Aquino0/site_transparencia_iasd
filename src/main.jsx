import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FinancialProvider } from './context/FinancialContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FinancialProvider>
      <App />
    </FinancialProvider>
  </StrictMode>,
)
