import { Box, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        {
            label: "Contains special character",
            met: /[^A-Za-z0-9]/.test(password),
        },
    ];

    return (
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5, color: "grey.400" }}>
            {criteria.map((item) => (
                <Box
                    key={item.label}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                    {item.met ? (
                        <CheckCircle sx={{ fontSize: 16, color: "green" }} />
                    ) : (
                        <Cancel sx={{ fontSize: 16, color: "grey.500" }} />
                    )}
                    <Typography
                        variant="caption"
                        sx={{ color: item.met ? "green" : "grey.400" }}
                    >
                        {item.label}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default PasswordCriteria;