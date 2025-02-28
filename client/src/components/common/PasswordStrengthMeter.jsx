import { Box, Typography } from "@mui/material";
import PasswordCriteria from "./PasswordCriteria";

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
        if (pass.match(/\d/)) strength++;
        if (pass.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    };
    const strength = getStrength(password);

    const getColor = (strength) => {
        if (strength === 0) return "error.main";
        if (strength === 1) return "error.light";
        if (strength === 2) return "warning.main";
        if (strength === 3) return "warning.light";
        return "success.main";
    };

    const getStrengthText = (strength) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Good";
        return "Strong";
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Typography variant="caption" color="grey.400">
                    Password strength
                </Typography>
                <Typography variant="caption" color="grey.400">
                    {getStrengthText(strength)}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 0.5 }}>
                {[...Array(4)].map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            height: 4,
                            flex: 1,
                            borderRadius: "9999px",
                            bgcolor: index < strength ? getColor(strength) : "grey.600",
                            transition: "background-color 0.3s",
                        }}
                    />
                ))}
            </Box>
            <PasswordCriteria password={password} />
        </Box>
    );
};

export default PasswordStrengthMeter;