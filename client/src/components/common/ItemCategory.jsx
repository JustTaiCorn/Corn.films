import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const ItemCategory = ({ item }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        const isGenre = location.pathname === "/the-loai";
        const basePath = isGenre ? "/the-loai" : "/quoc-gia";
        navigate(`${basePath}/${item.slug}`, { state: { name: item.name } });
    };
    return (
        <Box>
            <Button
                variant="outlined"
                fullWidth
                onClick={handleClick}
                sx={{
                    p: 2,
                    textTransform: "capitalize",
                    borderRadius: "20px",
                    ":hover": { color: "white", }
                }}
            >
                {item.name}
            </Button>
        </Box>
    );
};

export default ItemCategory;