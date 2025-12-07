import { useEffect } from "react";

import { useParams, useSearchParams, Link as RouterLink } from "react-router-dom";
import { useListByCategory, useListByCountry } from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import Paginations from "../components/common/Paginations";
import { ChevronRight } from "lucide-react";

const MediaListByRequest = () => {
    const { slug } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const currPage = parseInt(searchParams.get("page")) || 1;

    const isCategory = window.location.pathname.includes("/the-loai/");
    const categoryResult = useListByCategory({ category: slug, currPage });
    const countryResult = useListByCountry({ country: slug, currPage });
    const { isLoading, data } = isCategory ? categoryResult : countryResult;
    const medias = data?.items || [];
    const totalItems = data?.params?.pagination?.totalItems || 0;
    const totalItemsPerPage = data?.params?.pagination?.totalItemsPerPage || 10;
    const totalPage = Math.ceil(totalItems / totalItemsPerPage) || 1;

    const onPageChange = (page) => {
        setSearchParams({ page });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug, currPage]);


    const formatSlug = (slug) => {
        if (!slug) return "";
        return slug
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className="mt-20 max-w-[1366px] mx-auto text-foreground px-5 md:px-0">
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <RouterLink to="/" className="hover:text-primary transition-colors">
                    Trang chủ
                </RouterLink>
                <ChevronRight className="h-4 w-4" />
                <RouterLink to={isCategory ? "/the-loai" : "/quoc-gia"} className="hover:text-primary transition-colors">
                    {isCategory ? "Thể loại" : "Quốc gia"}
                </RouterLink>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">
                    {formatSlug(slug)}
                </span>
            </div>

            <MediaGrid medias={medias} />

            {totalPage > 1 && (
                <Paginations
                    currentPage={currPage}
                    totalPages={totalPage}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default MediaListByRequest;