import { Paper, useMediaQuery, useTheme } from "@mui/material";
import Episode from "./Episode";
import { grey } from "@mui/material/colors";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { setEpisodes, setEpisode } from "../../redux/features/episodeSlice";
import { useEffect } from "react";

const EpisodeList = ({ episodes }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (episodes?.length > 0) {
            dispatch(setEpisodes(episodes));
            // Tự động chọn tập đầu tiên khi có episodes
            dispatch(setEpisode(episodes[0]));
        }
    }, [episodes, dispatch]);

    return (
        <Paper
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                backgroundColor: grey[100],
                boxShadow: 3,
                minHeight: "100px",
                maxHeight: isMobile ? "200px" : "400px",
                overflow: "auto",
                justifyContent: "center",
            }}
        >
            <Row gutter={[10, 16]} justify="center">
                {episodes.map((episode, index) => (
                    <Col key={index} xs={6} sm={4} md={3} lg={2}>
                        <Episode episode={episode} />
                    </Col>
                ))}
            </Row>
        </Paper>
    );
};

export default EpisodeList;