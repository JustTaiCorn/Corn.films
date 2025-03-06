import { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    Paper,
    Stack,
} from "@mui/material";
import { ContentCopy, Share as ShareIcon } from "@mui/icons-material";
import Modal from "react-modal";
import {
    FacebookShareButton,
    TwitterShareButton,
    RedditShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    RedditIcon,
    WhatsappIcon,
    TelegramIcon,
} from "react-share";
import { toast } from "react-toastify";

// Cấu hình Modal để hoạt động với root element
Modal.setAppElement("#root");

const sharePlatforms = [
    { name: "Facebook", component: FacebookShareButton, icon: FacebookIcon },
    { name: "Twitter", component: TwitterShareButton, icon: TwitterIcon },
    { name: "Reddit", component: RedditShareButton, icon: RedditIcon },
    { name: "WhatsApp", component: WhatsappShareButton, icon: WhatsappIcon },
    { name: "Telegram", component: TelegramShareButton, icon: TelegramIcon },
];

const MovieShareModal = ({ movieUrl, movieTitle = "Check out this movie!" }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleCopyLink = () => {
        navigator.clipboard.writeText(movieUrl);
        toast.success("Copied link to clipboard");
    }
    return (
        <Box>
            <IconButton
                onClick={openModal}
                aria-label="share movie"
                sx={{ p: 1 }}
            >
                <ShareIcon sx={{ color: "inherit" }} />
            </IconButton>

            <Modal
                contentLabel="Share Movie Modal"
                ariaHideApp={true}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(62, 62, 62, 0.589)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    content: {
                        position: "relative",
                        top: "auto",
                        left: "auto",
                        right: "auto",
                        bottom: "auto",
                        border: "none",
                        background: "none",
                        padding: 0,
                        width: "90%",
                        maxWidth: 480,
                        maxHeight: "80vh",
                        margin: "0 auto",
                        overflow: "auto",
                    },
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 5,
                        bgcolor: "#f5f5f5",
                        borderRadius: 5,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
                        <Typography variant="subtitle1" sx={{ color: "#333", fontWeight: "bold" }}>
                            Share This Movie
                        </Typography>
                        <IconButton onClick={closeModal} sx={{ p: 0.5 }}>
                            <Typography variant="body1" sx={{ color: "#666", cursor: "pointer", fontWeight: "bold" }}>
                                ×
                            </Typography>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }, gap: 1 }}>
                        {sharePlatforms.map((platform) => {
                            const ShareButtonComponent = platform.component;
                            const ShareIconComponent = platform.icon;

                            return (
                                <Box key={platform.name}>
                                    <ShareButtonComponent
                                        url={movieUrl}
                                        title={movieTitle}
                                        quote={movieTitle}
                                        hashtag="#movie"
                                        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}
                                    >
                                        <Stack spacing={1} alignItems={"center"}>
                                            <ShareIconComponent size={32} round />
                                            <Typography variant="body2" sx={{ color: "#333" }}>
                                                {platform.name}
                                            </Typography>
                                        </Stack>
                                    </ShareButtonComponent>
                                </Box>
                            );
                        })}
                    </Box>
                    <Box sx={{ p: 1, textAlign: "left", mt: 1 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "black", fontWeight: "bold" }}
                        >
                            Movie Link:
                        </Typography>
                        <Stack direction={"row"}
                            sx={{
                                p: 1,
                                bgcolor: "white",
                                borderRadius: 4,
                                mt: 2,
                                border: "1px solid #ddd",
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: "#666", wordBreak: "break-word" }}
                            >
                                {movieUrl}
                            </Typography>
                            <IconButton

                            >
                                <ContentCopy onClick={handleCopyLink} sx={{ color: "#666" }} />
                            </IconButton>
                        </Stack>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    );
};

export default MovieShareModal;