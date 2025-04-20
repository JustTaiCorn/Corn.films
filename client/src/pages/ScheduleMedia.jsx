import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    styled
} from '@mui/material';
import { useState, useEffect, useRef } from 'react'; // Thêm useRef
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { use } from 'react';

// Dữ liệu phim theo ngày
const moviesByDate = {
    0: [
        { id: 1, title: "Bảo Hiểm Ly Hôn", episode: "Tập 5", time: "21:30", image: "https://img.ophim.live/uploads/movies/bao-hiem-ly-hon-thumb.jpg" },
        { id: 2, title: "Xa Ngoài Kia Nơi Loài Tôm Hát", episode: "Tập 3", time: "22:00", image: "https://img.ophim.live/uploads/movies/xa-ngoai-kia-noi-loai-tom-hat-thumb.jpg" }
    ],
    1: [
        { id: 3, title: "Chuyến Đời Bắc Sĩ Nội Trú", episode: "Tập 3", time: "", image: "https://img.ophim.live/uploads/movies/chuyen-doi-bac-si-noi-tru-thumb.jpg" },
        { id: 4, title: "Cung Điện Ma Ám", episode: "Tập 2", time: "", image: "https://img.ophim.live/uploads/movies/cung-dien-ma-am-thumb.jpg" },
        { id: 5, title: "Bậc thầy đàm phán", episode: "Tập 11", time: "", image: "https://img.ophim.live/uploads/movies/bac-thay-dam-phan-thumb.jpg" },
    ],
    2: [
        { id: 11, title: "Bậc thầy đàm phán", episode: "Tập 10", time: "", image: "https://img.ophim.live/uploads/movies/bac-thay-dam-phan-thumb.jpg" },
        { id: 7, title: "Cung Điện Ma Ám", episode: "Tập 3", time: "", image: "https://img.ophim.live/uploads/movies/cung-dien-ma-am-thumb.jpg" }
    ],
    3: [
        { id: 8, title: "Vô Ưu Độ", episode: "Tập 15", time: "", image: "https://img.ophim.live/uploads/movies/vo-uu-do-thumb.jpg" }
    ],
    4: [
        { id: 9, title: "Khi cuộc đời cho bạn quả quýt", episode: "Tập 18", time: "", image: "https://img.ophim.live/uploads/movies/khi-cuoc-doi-cho-ban-qua-quyt-thumb.jpg" },
        { id: 10, title: "Vộ Ưu Độ", episode: "Tập 16", time: "", image: "https://img.ophim.live/uploads/movies/vo-uu-do-thumb.jpg" },
        { id: 11, title: "Bậc thầy đàm phán", episode: "Tập 11", time: "", image: "https://img.ophim.live/uploads/movies/bac-thay-dam-phan-thumb.jpg" },
        { id: 12, title: "Trái tim chôn vùi", episode: "Tập 12", time: "", image: "https://img.ophim.live/uploads/movies/trai-tim-chon-vui-thumb.jpg" },
    ],
    5: [
        { id: 13, title: "Top Form the series", episode: "Tập 17", time: "", image: "https://img.ophim.live/uploads/movies/top-form-the-series-thumb.jpg" },
        { id: 14, title: "Chuyến Đời Bắc Sĩ Nội Trú", episode: "Tập 4", time: "", image: "https://img.ophim.live/uploads/movies/chuyen-doi-bac-si-noi-tru-thumb.jpg" },
    ],
    6: [
        { id: 15, title: "Ăn, Chạy, Yêu", episode: "Tập 14", time: "", image: "https://img.ophim.live/uploads/movies/an-chay-yeu-thumb.jpg" },
        { id: 16, title: "Hội bạn trai của Bunny", episode: "Tập 3", time: "", image: "https://img.ophim.live/uploads/movies/hoi-ban-trai-cua-bunny-thumb.jpg" }
    ]
};

const dates = (() => {
    const daysInVietnamese = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const today = new Date();

    return Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        return {
            date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
            day: daysInVietnamese[date.getDay()],
            id: i
        };
    });
})();

// Styled date slide
const DateSlide = styled(Box)(({ isActive }) => ({
    padding: '15px 5px',
    textAlign: 'center',
    color: 'white',
    opacity: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: isActive ? 'rgba(38, 40, 49, 0.7)' : 'transparent',
    borderBottom: isActive ? '3px solid #e6b800' : 'none',
    '& .MuiTypography-body1': {
        color: isActive ? '#e6b800' : 'white'
    }
}));

export default function ScheduleMedia() {
    const [currentDateIndex, setCurrentDateIndex] = useState(2);
    const [currentMovies, setCurrentMovies] = useState([]);
    const swiperRef = useRef(null);
    useEffect(() => {
        // Lấy phim của ngày hiện tại
        const dayMovies = moviesByDate[currentDateIndex] || [];
        setCurrentMovies(dayMovies);
    }, [currentDateIndex]);


    // Thêm hàm xử lý khi click vào ngày
    const handleDateClick = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
            setCurrentDateIndex(index);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <Box sx={{ color: '#fff', mt: 10, minHeight: '100vh', backgroundColor: '#1a1d24' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', p: 3, pb: 1 }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', alignItems: 'center' }}>
                    <Box component="span" sx={{ mr: 1, fontSize: '1.5rem' }}>📅</Box>
                    Lịch chiếu
                </Typography>
            </Box>

            {/* Swiper dates section with clickable slides */}
            <Box sx={{ position: 'relative', mb: 4, }}>
                <Swiper
                    ref={swiperRef} // Gắn ref vào Swiper
                    modules={[Navigation]}
                    breakpoints={{
                        640: { slidesPerView: 5 },
                        768: { slidesPerView: 6 },
                        1024: { slidesPerView: 7 },
                    }}
                    style={{ padding: '0 20px' }}
                    navigation={true}
                    initialSlide={currentDateIndex}
                >
                    {dates.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <DateSlide
                                isActive={index === currentDateIndex}
                                onClick={() => handleDateClick(index)}
                                sx={{ cursor: 'pointer' }} // Thêm con trỏ chuột để thể hiện có thể click
                            >
                                <Typography variant="body2" sx={{ color: '#aaa', mb: 0.5 }}>
                                    {item.date}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {item.day}
                                </Typography>
                            </DateSlide>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            {/* Movie grid - now using Grid for responsive layout */}
            <Box sx={{ p: 3, pt: 0, }}>
                {currentMovies.length > 0 ? (
                    <Grid container spacing={2}>
                        {currentMovies.map((movie) => (
                            <Grid item xs={12} md={6} lg={3} key={movie.id}>
                                <Box
                                    sx={{
                                        bgcolor: 'rgba(37, 40, 48, 0.8)',
                                        borderRadius: 2,
                                        transition: 'all 0.3s',
                                        cursor: 'pointer',
                                        height: '100%',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                                        },
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', p: 2 }}>
                                        <Box
                                            component="img"
                                            src={movie.image || "/api/placeholder/80/110"}
                                            alt={movie.title}
                                            sx={{
                                                width: 80,
                                                height: 110,
                                                borderRadius: 1,
                                                objectFit: 'cover',
                                                mr: 2
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                {movie.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#aaa' }}>
                                                {movie.episode}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography sx={{ textAlign: 'center', py: 4 }}>
                        Không có lịch chiếu nào cho ngày này
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
