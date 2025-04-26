import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './Styles/Theme/theme.css'
import { VarThemeColor } from './GlobalVarColor/themeVars.ts'

const initialTheme: 'dark' | 'light' = 'dark'
const vars = VarThemeColor[initialTheme]
const html = document.documentElement

Object.entries(vars).forEach(([key, value]) => {
    html.style.setProperty(key, value)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
