import { Box, Pagination, } from "@mui/material";



const Paginations = ({ currentPage, totalPages, onPageChange }) => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
                size="large"
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