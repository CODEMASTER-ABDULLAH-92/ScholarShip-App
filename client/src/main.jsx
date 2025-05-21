import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import contextProvider from './Context/ContextApi.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
<contextProvider>
    <App />
</contextProvider>
    </BrowserRouter>
)
