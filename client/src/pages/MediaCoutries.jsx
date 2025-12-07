import mediaApi from "../api/modules/media.api";
import CategoryGrid from "../components/common/CategoryGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function MediaCoutries() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data } = useQuery({
        queryKey: ['mediaCountries'],
        queryFn: () => mediaApi.getCoutry()
    });
    const items = data?.items;
    return (
        <div className="text-center mt-20 px-5 text-foreground">
            <h5 className="font-bold text-2xl mb-2">Quốc Gia</h5>
            <h6 className="opacity-50 text-base mb-8">Chọn 1 Quốc gia bên dưới😘</h6>

            <CategoryGrid items={items} />
        </div>
    )
};