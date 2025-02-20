import { Box, Pagination, } from "@mui/material";

import { useMediaQuery, useTheme } from '@mui/material';

const Paginations = ({ currentPage, totalPages, onPageChange }) => {


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
                size={isMobile ? "small" : "large"}
                variant="outlined"
                color="primary"
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
            />
        </Box>
    );
};

export default Paginations;