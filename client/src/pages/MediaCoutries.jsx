import { Box, Typography } from "@mui/material";
import mediaApi from "../api/modules/media.api";
import CategoryGrid from "../components/common/CategoryGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function MediaCoutries() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data } = useQuery({
        queryKey: ['mediaCountries'],
        queryFn: () => mediaApi.getCoutry()
    });
    const items = data?.items;
    return (
        <Box sx={{ textAlign: "center", mt: 10 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Quốc Gia</Typography>
            <Typography variant="h6" sx={{ opacity: 0.5, fontSize: 16 }}>Chọn 1 Quốc gia bên dưới😘</Typography>

            <CategoryGrid items={items} />
        </Box>
    )
};