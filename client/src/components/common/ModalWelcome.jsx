import { Box, Button, Modal, } from "@mui/material";
import { useEffect, useState } from "react";


export default function ModalWelcome() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Set timer to show modal after 3 seconds (adjust as needed)
        const timer = setTimeout(() => {
            setOpen(true);
        }, 3000);

        // Clear the timer if component unmounts
        return () => clearTimeout(timer);
    }, []);

    const handleRedirect = () => {
        // Open in new tab while keeping current tab
        window.open("https://vi.wikipedia.org/wiki/S%E1%BB%B1_ki%E1%BB%87n_30_th%C3%A1ng_4_n%C4%83m_1975", "_blank");
        return;
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="welcome-modal"
            aria-describedby="promotional-modal"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: '500px', md: '400px' },
                borderRadius: 2,
                boxShadow: 24,
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Box
                    component="img"
                    sx={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'contain',
                        mb: 3, borderRadius: 10
                    }}
                    src="https://i.pinimg.com/736x/6b/08/d2/6b08d20d57cecab2320ad3be55a31bfb.jpg"
                    alt="Promotional image"
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRedirect}
                    sx={{ width: '100%', py: 1, borderRadius: 10 }}
                >
                    Tìm hiểu thôi nào
                </Button>
            </Box>
        </Modal>
    )
}
