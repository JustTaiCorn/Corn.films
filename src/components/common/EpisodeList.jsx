import { Paper } from "@mui/material";
import Episode from "./Episode";
import { grey, } from "@mui/material/colors";
import { Col, Row } from "antd";

const EpisodeList = ({ episodes }) => {
    return (
        <Paper
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                backgroundColor: grey[100],
                boxShadow: 3,
                minHeight: "100px",
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