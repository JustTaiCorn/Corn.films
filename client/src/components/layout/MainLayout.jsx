import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import SidebarForPC from "../common/SidebarForPC";
import Topbar from "../common/Topbar";

const MainLayout = () => {
    return (
        <>

            <Box display="flex" minHeight="100vh" flexDirection="column">
                <Box display="flex" flexGrow={1} flexDirection="row">
                    {/* sidebar */}
                    <SidebarForPC />
                    {/* sidebar */}

                    {/* main */}
                    <Box
                        component="main"
                        flexGrow={1}
                        overflow="hidden"
                        minHeight="100vh"
                        marginLeft={{ xs: "30px", lg: "45px" }}

                    >
                        <Topbar />
                        <Outlet />
                        <GlobalLoading />
                    </Box>
                    {/* main */}
                </Box>
                {/* footer */}
                <Footer />
                {/* footer */}
            </Box>
        </>
    );
};

export default MainLayout;