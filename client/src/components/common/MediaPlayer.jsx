import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const MediaPlayer = () => {
    const selectedEpisode = useSelector((state) => state.episode.selectedEpisode);
    console.log(selectedEpisode);
    const [isTheaterMode, setIsTheaterMode] = useState(false);

    const toggleTheaterMode = () => {
        setIsTheaterMode(prev => !prev);
    };

    return (
        <div className={`relative z-50 ${isTheaterMode ? "before:fixed before:inset-0 before:bg-black before:-z-10" : ""}`}>
            <div className="m-auto p-4 w-full box-border relative z-10">
                <div className="flex flex-col items-center">
                    <div
                        className={`w-full max-w-[1000px] transition-all duration-300 `}
                    >
                        <iframe
                            src={selectedEpisode?.link_embed}
                            title={selectedEpisode?.filename}
                            allowFullScreen
                            className={`w-full aspect-video rounded-xl border-2 ${isTheaterMode ? 'border-black shadow-[0_0_30px_rgba(255,0,0,0.3)]' : 'border-[#e40000] shadow-md'}`}
                        />
                    </div>

                    <Button
                        variant={isTheaterMode ? "default" : "outline"}
                        className={`mt-4 rounded-full px-6 py-2 text-sm capitalize ${isTheaterMode ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "border-destructive text-destructive hover:bg-destructive/10"}`}
                        onClick={toggleTheaterMode}
                    >
                        {isTheaterMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                        {isTheaterMode ? "Bật đèn" : "Tắt đèn"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MediaPlayer;
