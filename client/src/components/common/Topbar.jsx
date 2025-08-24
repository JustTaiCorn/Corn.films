import { useState, useEffect, useRef, useCallback } from 'react';

import {
    Box,
    IconButton,
    Badge,
    Avatar,
    Tooltip,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CircularProgress, TextField, InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../api/modules/media.api';
import debounce from 'lodash.debounce';
import { routesGen } from '../../routes/routes';

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
                maxWidth: "100vw",
                height: 70,
                pr: 4,
                my: 2,
                mx: "auto",
                position: 'relative',
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                flex: '1', // Cho phép co giãn nhưng không quá lớn
                maxWidth: 500 // Giới hạn tối đa cho container search
            }} ref={searchRef}>
                <Box sx={{

                    width: '100%',
                    maxWidth: 400, // Giới hạn width tối đa
                    minWidth: 250, // Width tối thiểu
                    display: 'flex',
                    alignItems: 'center',
                }}>

                    <TextField
                        sx={{ width: "100%", height: "50%" }}
                        placeholder="Tìm kiếm phim..."
                        value={searchQuery}
                        onChange={onQueryChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="lucide lucide-search-icon lucide-search">
                                            <path d="m21 21-4.34-4.34" />
                                            <circle cx="11" cy="11" r="8" />
                                        </svg>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
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
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                </Box>

                {/* Search Results Dropdown */}
                {data?.items && (
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            width: '80%',
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