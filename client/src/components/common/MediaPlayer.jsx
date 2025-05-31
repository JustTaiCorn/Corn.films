import { Alert, AlertTitle, Stack, Typography, Button, Box } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import uiConfigs from "../../configs/ui.configs";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

export default function MediaPlayer() {
    const selectedEpisode = useSelector((state) => state.episode.selectedEpisode);
    const iframeRef = useRef();
    const [isTheaterMode, setIsTheaterMode] = useState(false);

    useEffect(() => {
        const updateIframeHeight = () => {
            if (iframeRef.current) {
                const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
                iframeRef.current.setAttribute("height", height);
            }
        };

        updateIframeHeight();
        window.addEventListener("resize", updateIframeHeight);

        return () => window.removeEventListener("resize", updateIframeHeight);
    }, [selectedEpisode]);

    const toggleTheaterMode = () => {
        setIsTheaterMode(prev => !prev);
    };

    return (
        <Box sx={{
            position: 'relative',
            zIndex: 100,
            ...(isTheaterMode && {
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgb(0, 0, 0)',
                    zIndex: -1
                }
            })
        }}>
            <Stack sx={{
                ...uiConfigs.style.mainContent,
                position: 'relative',
                zIndex: 2,
            }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: '1000px',
                        transition: 'all 0.3s ease',
                        ...(isTheaterMode && {
                            transform: 'scale(1.2)',
                        })
                    }}>
                        <iframe
                            src={selectedEpisode?.link_embed}
                            title={selectedEpisode?.filename}
                            allowFullScreen
                            ref={iframeRef}
                            style={{
                                width: "100%",
                                borderRadius: "12px",
                                border: `2px solid ${isTheaterMode ? '#000' : '#e40000'}`,
                                boxShadow: isTheaterMode
                                    ? '0 0 30px rgba(255, 0, 0, 0.3)'
                                    : '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </Box>

                    <Button
                        variant={isTheaterMode ? "contained" : "outlined"}
                        color="error"
                        startIcon={isTheaterMode ? <LightModeIcon /> : <DarkModeIcon />}
                        onClick={toggleTheaterMode}
                        sx={{
                            mt: isTheaterMode ? 10 : 1,
                            borderRadius: '20px',
                            px: 3,
                            py: 1,
                            fontSize: '0.9rem',
                            textTransform: 'none'
                        }}
                    >
                        {isTheaterMode ? "Bật đèn" : "Tắt đèn"}
                    </Button>
                </Box>

            </Stack>
        </Box>
    );
}
