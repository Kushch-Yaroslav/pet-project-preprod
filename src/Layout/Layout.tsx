import {Outlet} from 'react-router-dom';
import GlobalHeader from "../Components/Header/GlobalHeader.tsx";
import {ProximityProvider} from "../Features/Proximity/components/ProximityProvider.tsx";

const Layout = () => {
    return (
        <>
            <ProximityProvider>
                <GlobalHeader/>
                <main>
                    <Outlet/>
                </main>
            </ProximityProvider>

        </>
    );
};

export default Layout;
