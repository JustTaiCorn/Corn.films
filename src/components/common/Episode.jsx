import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEpisode } from "../../redux/features/episodeSlice";
const Episode = ({ episode }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setEpisode(episode));
    }
    const selectEpisode = useSelector((state) => state.episode.selectedEpisode);
    console.log("Current selectedEpisode in Redux:", selectEpisode);
    console.log("Current episode slug:", episode.slug);
    return (
        <Button
            variant="contained"

            sx={{
                width: "100%",
                fontSize: { xs: '10px', sm: '14px', md: '16px' },
                backgroundColor: selectEpisode?.slug === episode?.slug ? "#f00e21" : "#f46f6f",
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "#f00e21",
                    transform: "scale(1.05)",
                },
                transition: "all 0.2s ease-in-out",

            }}
            onClick={() => handleClick()}
        >
            {episode.name}
        </Button >
    );
};

export default Episode;