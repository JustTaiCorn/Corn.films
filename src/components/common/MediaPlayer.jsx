import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import uiConfigs from "../../configs/ui.configs";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export default function MediaPlayer() {
    const selectedEpisode = useSelector((state) => state.episode.selectedEpisode);
    const iframeRef = useRef();

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

    return (
        <Stack sx={{ ...uiConfigs.style.mainContent }}>
            {selectedEpisode ? (
                <iframe
                    src={selectedEpisode.link_embed}
                    title={selectedEpisode.filename}
                    allowFullScreen
                    ref={iframeRef}
                    style={{
                        width: "100%",
                        borderRadius: "12px",
                        border: "2px solid #e40000",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                ></iframe>
            ) : (
                <Alert severity="info" >
                    <AlertTitle>Info</AlertTitle>
                    <Typography fontSize={18}>Vui lòng chọn tập phim để phát😘</Typography></Alert>
            )}
        </Stack>
    );
}
