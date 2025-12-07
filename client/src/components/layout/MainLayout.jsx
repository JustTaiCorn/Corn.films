
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";

import Topbar from "../common/Topbar";
import SideBarForPC from "../common/SideBarForPC";
const MainLayout = () => {
    return (
        <>


            <div className="flex min-h-screen flex-col">
                <div className="flex flex-grow flex-row">
                    {/* sidebar */}
                    <SideBarForPC />
                    {/* sidebar */}

                    {/* main */}
                    <main
                        className="flex-grow overflow-hidden min-h-screen ml-0 md:ml-[320px] lg:ml-[320px] flex flex-col"
                    >
                        <Topbar />
                        <Outlet />
                    </main>
                    {/* main */}
                </div>
                {/* footer */}
                <Footer />
                {/* footer */}
            </div>
        </>
    );
};

export default MainLayout;