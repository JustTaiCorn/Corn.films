import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setEpisode } from "../../redux/features/episodeSlice";
import { cn } from "@/lib/utils";

const Episode = ({ episode }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setEpisode(episode));
    }
    const selectEpisode = useSelector((state) => state.episode.selectedEpisode);
    const isSelected = selectEpisode?.slug === episode?.slug;

    return (
        <Button
            variant="default"
            className={cn(
                "w-full text-xs sm:text-sm md:text-base capitalize transition-all duration-200 hover:scale-105",
                isSelected ? "bg-[#f00e21] hover:bg-[#d00010]" : "bg-[#f46f6f] hover:bg-[#f00e21]"
            )}
            onClick={() => handleClick()}
        >
            {episode.name}
        </Button >
    );
};

export default Episode;