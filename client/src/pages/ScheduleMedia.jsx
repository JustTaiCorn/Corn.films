import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { cn } from "@/lib/utils";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

export default function ScheduleMedia() {
    const [currentDateIndex, setCurrentDateIndex] = useState(2);
    const [currentMovies, setCurrentMovies] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        const dayMovies = moviesByDate[currentDateIndex] || [];
        setCurrentMovies(dayMovies);
    }, [currentDateIndex]);

    const handleDateClick = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
            setCurrentDateIndex(index);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="min-h-screen text-foreground p-4 bg-transparent rounded-3xl mt-20 max-w-[1366px] mx-auto">
            <div className="flex items-center p-6 border-b border-border/10">
                <span className="text-3xl mr-2">📅</span>
                <h1 className="text-2xl font-bold">Lịch chiếu</h1>
            </div>

            <div className="relative mb-8">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    breakpoints={{
                        640: { slidesPerView: 5 },
                        768: { slidesPerView: 6 },
                        1024: { slidesPerView: 7 },
                    }}
                    style={{ padding: '0 20px' }}
                    navigation={false}
                    initialSlide={currentDateIndex}
                >
                    {dates.map((item, index) => {
                        const isActive = index === currentDateIndex;
                        return (
                            <SwiperSlide key={item.id}>
                                <div
                                    onClick={() => handleDateClick(index)}
                                    className={cn(
                                        "py-4 px-2 text-center cursor-pointer flex flex-col justify-center transition-all h-full border-b-4",
                                        isActive
                                            ? "bg-zinc-800/70 border-primary"
                                            : "border-transparent hover:bg-zinc-800/30"
                                    )}
                                >
                                    <p className={cn("text-sm mb-1", isActive ? "text-primary dark:text-yellow-500" : "text-muted-foreground")}>
                                        {item.date}
                                    </p>
                                    <p className={cn("text-base font-bold", isActive ? "text-primary dark:text-yellow-500" : "text-foreground")}>
                                        {item.day}
                                    </p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            <div className="p-6 pt-0">
                {currentMovies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {currentMovies.map((movie) => (
                            <div key={movie.id} className="bg-zinc-100/90 dark:bg-zinc-800/80 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                                <div className="flex p-4">
                                    <img
                                        src={movie.image || "/api/placeholder/80/110"}
                                        alt={movie.title}
                                        className="w-20 h-[110px] rounded object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                                        <p className="text-sm text-muted-foreground">{movie.episode}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-8 text-muted-foreground">
                        Không có lịch chiếu nào cho ngày này
                    </p>
                )}
            </div>
        </div>
    );
}
