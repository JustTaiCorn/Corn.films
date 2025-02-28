import { TextField, InputAdornment } from "@mui/material";

const Input = ({ icon: Icon, ...props }) => {
    return (
        <TextField
            {...props}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
                bgcolor: "rgba(66, 66, 66, 0.5)",
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
                color: "white",
                "& input::placeholder": {
                    color: "grey.400",
                },
            }}
        />
    );
};

export default Input;
