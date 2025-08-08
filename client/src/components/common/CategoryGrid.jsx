import { Col, Row } from "antd"

import { Box } from "@mui/material"
import ItemCategory from "./ItemCategory"
import uiConfigs from "../../api/configs/ui.configs"

function CategoryGrid({ items }) {
    return (
        <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Row gutter={[16, 16]}>
                {items?.map((item, index) => (
                    <Col key={index} xs={12} sm={8} md={4}>
                        <ItemCategory item={item} />
                    </Col >
                ))}
            </Row>
        </Box>
    )
}

export default CategoryGrid