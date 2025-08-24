import { Paper, useMediaQuery, useTheme } from "@mui/material";
import Episode from "./Episode";
import { grey } from "@mui/material/colors";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEpisode } from "../../redux/features/episodeSlice";

const EpisodeList = ({ episodes }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    useEffect(() => {
        if (episodes && episodes.length > 0) {
            dispatch(setEpisode(episodes[0]));
        }
    }, [episodes, dispatch]);

    return (
        <Paper
            sx={{
                p: 2,
                mx: "auto",
                borderRadius: 2,
                backgroundColor: grey[100],
                boxShadow: 3,
                width: "95%",
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