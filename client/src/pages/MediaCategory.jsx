import mediaApi from "../api/modules/media.api";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import CategoryGrid from "../components/common/CategoryGrid";
import { useEffect } from "react";


const MediaCategory = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data } = useQuery({
        queryKey: ['mediaCategories'],
        queryFn: () => mediaApi.getCategory()
    });

    const items = data?.items;
    return (
        <Box sx={{ textAlign: "center", mt: 10 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>THỂ LOẠI</Typography>
            <Typography variant="h6" sx={{ opacity: 0.5, fontSize: 16 }}>Chọn 1 Thể loại bên dưới😘</Typography>

            <CategoryGrid items={items} />
        </Box>
    )
};

export default MediaCategory;