import { useState } from "react";
import { Share, Copy, X } from "lucide-react";
import Modal from 'react-modal';
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        <div>
            <Button
                variant="ghost"
                size="icon"
                onClick={openModal}
                className="p-2 h-auto w-auto"
            >
                <Share className="w-6 h-6" />
            </Button>

            <Modal
                contentLabel="Share Movie Modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="outline-none"
                overlayClassName="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4"
                shouldCloseOnOverlayClick={true}
            >
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden outline-none">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b dark:border-zinc-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            Share This Movie
                        </h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={closeModal}
                            className="h-8 w-8"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                            {sharePlatforms.map((platform) => {
                                const ShareButtonComponent = platform.component;
                                const ShareIconComponent = platform.icon;

                                return (
                                    <div key={platform.name} className="flex justify-center">
                                        <ShareButtonComponent
                                            url={movieUrl}
                                            title={movieTitle}
                                            quote={movieTitle}
                                            hashtag="#movie"
                                            className="flex flex-col items-center gap-2 group outline-none"
                                        >
                                            <ShareIconComponent size={40} round className="transition-transform group-hover:scale-110" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                {platform.name}
                                            </span>
                                        </ShareButtonComponent>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="space-y-2">
                            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                                Movie Link:
                            </p>
                            <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-zinc-800 rounded-md border border-gray-200 dark:border-zinc-700">
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate flex-1 font-mono">
                                    {movieUrl}
                                </p>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 shrink-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                    onClick={handleCopyLink}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MovieShareModal;