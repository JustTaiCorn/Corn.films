
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import SideBarForPC from "../common/SideBar.jsx";
const MainLayout = () => {
    return (
        <>


            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <div>
                    <SideBarForPC />
                    <main
                        className="flex-grow overflow-hidden min-h-screen ml-0 md:ml-[320px] lg:ml-[320px] "
                    >

                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;