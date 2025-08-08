import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";

import Topbar from "../common/Topbar";
import SideBarForPC from "../common/SideBarForPC";
const MainLayout = () => {
    return (
        <>

            <Box display="flex" minHeight="100vh" flexDirection="column">
                <Box display="flex" flexGrow={1} flexDirection="row">
                    {/* sidebar */}
                    <SideBarForPC />
                    {/* sidebar */}

                    {/* main */}
                    <Box
                        component="main"
                        flexGrow={1}
                        overflow="hidden"
                        minHeight="100vh"
                        marginLeft={{ xs: 0, sm: 0, md: "45px", lg: "45px" }}

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