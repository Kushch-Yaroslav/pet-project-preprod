import { Outlet } from 'react-router-dom';
import GlobalHeader from "../Components/Header/GlobalHeader.tsx";

const Layout = () => {
    return (
        <>
            <GlobalHeader />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
