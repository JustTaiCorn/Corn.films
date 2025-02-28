import { Box, Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { useListByCategory, useListByCountry } from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import Paginations from "../components/common/Paginations";
import { Link as RouterLink } from "react-router-dom";
const MediaListByRequest = () => {
    const { slug } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const currPage = parseInt(searchParams.get("page")) || 1;
    const dispatch = useDispatch();
    const isCategory = window.location.pathname.includes("/the-loai/");
    const categoryResult = useListByCategory({ category: slug, currPage });
    const countryResult = useListByCountry({ country: slug, currPage });
    const { isLoading, data } = isCategory ? categoryResult : countryResult;
    const medias = data?.items || [];
    const totalItems = data?.params?.pagination?.totalItems || 0;
    const totalItemsPerPage = data?.params?.pagination?.totalItemsPerPage || 1;
    const totalPage = Math.ceil(totalItems / totalItemsPerPage);

    const onPageChange = (page) => {
        setSearchParams({ page });
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug, currPage]);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [isLoading, dispatch]);

    const formatSlug = (slug) => {
        if (!slug) return "";
        return slug
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Box sx={{ ...uiConfigs.style.mainContent, mt: 20 }}>
            <Stack spacing={2} sx={{ mb: 3, ml: 2.5 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="large" />}
                    aria-label="breadcrumb"
                    sx={{ '& .MuiBreadcrumbs-separator': { fontSize: { sm: '0.25rem', md: '0.75rem' } } }}
                >
                    <Link
                        component={RouterLink}
                        to="/"
                        color="inherit"
                        sx={{
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                            fontSize: { sm: '0.15rem', md: '1.25rem' }
                        }}
                    >
                        Trang chủ
                    </Link>
                    <Link
                        component={RouterLink}
                        to={isCategory ? "/the-loai" : "/quoc-gia"}
                        color="inherit"
                        sx={{
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                            fontSize: { sm: '0.15rem', md: '1.25rem' }
                        }}
                    >
                        {isCategory ? "Thể loại" : "Quốc gia"}
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: { sm: '0.15rem', md: '1.25rem' } }}>
                        {formatSlug(slug)}
                    </Typography>
                </Breadcrumbs>
            </Stack>

            <MediaGrid medias={medias} isLoading={isLoading} />
            <Paginations
                currentPage={currPage}
                totalPages={totalPage}
                onPageChange={onPageChange}
            />
        </Box>
    );
};

export default MediaListByRequest;