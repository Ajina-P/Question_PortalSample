import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import QuestionProvider from './context/questionContext.jsx'
import AuthProvider from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QuestionProvider>
    <Router >
      <App />
    </Router>
    </QuestionProvider>
    </AuthProvider>
  </StrictMode>,
)
