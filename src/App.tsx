import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home.tsx';
import Layout from "./Layout/Layout.tsx";
import './Styles/Reset.css'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
