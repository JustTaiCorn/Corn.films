import { TextField, } from "@mui/material";

const Input = ({ ...props }) => {
    return (
        <TextField
            {...props}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
                bgcolor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "grey.700",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "green.500",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "green.500",
                    boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
                },
                "& .MuiInputBase-input": {
                    color: "black",
                },
            }}
        />
    );
};

export default Input;
