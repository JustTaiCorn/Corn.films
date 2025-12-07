import Episode from "./Episode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEpisode } from "../../redux/features/episodeSlice";

const EpisodeList = ({ episodes }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (episodes && episodes.length > 0) {
            dispatch(setEpisode(episodes[0]));
        }
    }, [episodes, dispatch]);

    return (
        <div className="p-4 mx-auto rounded-lg border border-gray-200 w-[95%] max-w-7xl overflow-auto flex justify-center items-start ">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 w-full">
                {episodes.map((episode, index) => (
                    <div key={index}>
                        <Episode episode={episode} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EpisodeList;