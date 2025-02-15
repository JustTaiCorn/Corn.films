import { Box } from "@mui/material";
import MediaItem from "./MediaItem";
import uiConfigs from "../../configs/ui.configs";
import { Col, Row } from 'antd';
const MediaGrid = ({ medias }) => {
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Row gutter={[5, 5]}>
        {medias?.map((media, index) => (
          <Col key={index} xs={12} sm={8} md={6}>
            <MediaItem media={media} />
          </Col >
        ))}
      </Row>
    </Box>
  );
};

export default MediaGrid;