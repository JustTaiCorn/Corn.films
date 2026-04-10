import { useEffect } from "react";
import { useParams, useSearchParams, Link as RouterLink, useLocation } from "react-router-dom";
import { useListByCategory, useListByCountry, useSortedMovies } from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import Paginations from "../components/common/Paginations";
import FilterBar from "../components/common/FilterBar";
import { ChevronRight } from "lucide-react";

const MediaListByRequest = () => {
    const { slug } = useParams();
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const currPage = parseInt(searchParams.get("page")) || 1;
    const year = searchParams.get("year") || "";
    const type = searchParams.get("type") || "";
    const sort_field = searchParams.get("sort_field") || "";

    const isCategory = location.pathname.includes("/the-loai/");
    const hasFilters = !!(year || type || sort_field);

    const categoryResult = useListByCategory({
        category: slug,
        currPage,
    });
    const countryResult = useListByCountry({
        country: slug,
        currPage,
    });
    const sortedResult = useSortedMovies({
        category: isCategory ? slug : "",
        country: !isCategory ? slug : "",
        year,
        type,
        sort_field,
        page: currPage,
    });

    const activeResult = hasFilters
        ? sortedResult
        : isCategory
        ? categoryResult
        : countryResult;

    const { data } = activeResult;
    const medias = data?.items || [];
    const totalItems = data?.params?.pagination?.totalItems || 0;
    const totalItemsPerPage = data?.params?.pagination?.totalItemsPerPage || 10;
    const totalPage = Math.ceil(totalItems / totalItemsPerPage) || 1;

    const onPageChange = (page) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", page);
            return next;
        });
    };

    const handleFilterChange = (newFilters) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", "1");
            if (newFilters.year) next.set("year", newFilters.year);
            else next.delete("year");
            if (newFilters.type) next.set("type", newFilters.type);
            else next.delete("type");
            if (newFilters.sort_field) next.set("sort_field", newFilters.sort_field);
            else next.delete("sort_field");
            return next;
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug, currPage]);

    const formatSlug = (slug) => {
        if (!slug) return "";
        return slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className="mt-20 max-w-[1366px] mx-auto text-foreground px-5 md:px-0">
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <RouterLink to="/" className="hover:text-primary transition-colors">
                    Trang chủ
                </RouterLink>
                <ChevronRight className="h-4 w-4" />
                <RouterLink
                    to={isCategory ? "/the-loai" : "/quoc-gia"}
                    className="hover:text-primary transition-colors"
                >
                    {isCategory ? "Thể loại" : "Quốc gia"}
                </RouterLink>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{formatSlug(slug)}</span>
            </div>

            <FilterBar
                filters={{ year, type, sort_field }}
                onChange={handleFilterChange}
            />

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