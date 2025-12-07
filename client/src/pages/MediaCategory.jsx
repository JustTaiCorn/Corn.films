import mediaApi from "../api/modules/media.api";
import { useQuery } from "@tanstack/react-query";
import CategoryGrid from "../components/common/CategoryGrid";
import { useEffect } from "react";

const MediaCategory = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data } = useQuery({
        queryKey: ['mediaCategories'],
        queryFn: () => mediaApi.getCategory()
    });

    const items = data?.items;

    return (
        <div className="text-center mt-20 px-5">
            <h5 className="font-bold text-2xl text-foreground mb-2">THỂ LOẠI</h5>
            <h6 className="text-base text-muted-foreground mb-8">Chọn 1 Thể loại bên dưới😘</h6>
            <CategoryGrid items={items} />
        </div>
    )
};

export default MediaCategory;