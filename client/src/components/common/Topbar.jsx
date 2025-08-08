import { useState, useEffect, useRef, useCallback } from 'react';

import {
    Box,
    IconButton,
    InputBase,
    alpha,
    Badge,
    Avatar,
    Tooltip,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../api/modules/media.api';
import debounce from 'lodash.debounce';
import { routesGen } from '../../routes/routes';

const Search = styled('div')(({ theme, isFocused }) => ({
    position: 'relative',
    borderRadius: 24,
    padding: 5,
    backgroundColor: alpha(theme.palette.common.white, 0.08),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.12),
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    border: isFocused ? `1px solid ${theme.palette.primary.main}` : 'none',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: alpha(theme.palette.common.white, 0.7)
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(3)})`,
        paddingRight: '2.5rem',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '45ch',
        },
    },
}));

export default function Topbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const debounceSearch = useCallback(
        debounce((query) => {
            setDebouncedQuery(query);
        }, 500),
        []
    );

    const { data, isLoading } = useSearch({
        query: debouncedQuery,
        enabled: !!debouncedQuery.trim() // Thêm điều kiện kích hoạt
    });

    const onQueryChange = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);

        // Chỉ debounce khi có nội dung hợp lệ
        if (newQuery.trim().length >= 3) {
            debounceSearch(newQuery.trim());
        } else {
            setDebouncedQuery(""); // Reset kết quả tìm kiếm
        }
    };

    // Xử lý đóng dropdown khi bấm ra ngoài vùng tìm kiếm
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setDebouncedQuery(""); // Đóng dropdown khi click ra ngoài
            }
        };

        // Thêm event listener khi component được mount
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            debounceSearch.cancel();
        };
    }, [debounceSearch]);

    const handleResultClick = (movie) => {
        navigate(routesGen.mediaDetail(movie.slug));
        setDebouncedQuery(""); // Đóng dropdown sau khi chọn kết quả
    }


    return (
        <Box
            sx={{
                display: { xs: "none", md: 'flex' },
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: 70,
                padding: 2,
                mt: 4,
                mb: 2,
                mr: 2,
                backgroundColor: 'background.paper',
                borderRadius: 10,
                position: 'relative',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }} ref={searchRef}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Tìm kiếm phim..."
                        value={searchQuery}
                        onChange={onQueryChange}
                    />
                    {searchQuery && (
                        <IconButton
                            size="small"
                            sx={{ position: 'absolute', right: 8 }}
                            onClick={() => {
                                setSearchQuery("");
                                setDebouncedQuery("");
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                </Search>

                {/* Search Results Dropdown */}
                {data?.items && (
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            width: '100%',
                            maxHeight: '70vh',
                            overflow: 'auto',
                            mt: 4,
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            bgcolor: 'background.paper',
                            zIndex: 1300
                        }}
                    >
                        {isLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : data?.items.length > 0 ? (
                            <>
                                <List sx={{ width: '100%', p: 0 }}>
                                    {data.items.map((movie, index) => (
                                        <ListItem
                                            key={index}
                                            button
                                            onClick={() => handleResultClick(movie)}
                                            alignItems="flex-start"
                                            sx={{
                                                py: 1.5,
                                                borderBottom: index !== data.items.length - 1 ? '1px solid' : 'none',
                                                borderColor: 'divider'
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="rounded"
                                                    src={`https://img.ophim.live/uploads/movies/${movie.poster_url}`}
                                                    alt={movie.name}
                                                    sx={{ width: 56, height: 70, mr: 1 }}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={movie.name}
                                                secondary={
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography component="span" variant="body2" color="text.secondary">
                                                            {movie.origin_name}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                            {movie.quality && (
                                                                <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>
                                                                    {movie.quality}
                                                                </Typography>
                                                            )}
                                                            {movie.episode_current && (
                                                                <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>
                                                                    • {movie.episode_current}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        ) : searchQuery.trim() ? (
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="body1">Không tìm thấy kết quả</Typography>
                            </Box>
                        ) : null}
                    </Paper>
                )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Thông báo">
                    <IconButton sx={{ color: 'text.primary' }}>
                        <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Tài khoản">
                    <IconButton>
                        <Avatar
                            alt="User Profile"
                            sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}