import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Bell } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../../api/modules/media.api';
import debounce from 'lodash.debounce';
import { routesGen } from '../../routes/routes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

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
        enabled: !!debouncedQuery.trim()
    });

    const onQueryChange = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);

        if (newQuery.trim().length >= 3) {
            debounceSearch(newQuery.trim());
        } else {
            setDebouncedQuery("");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setDebouncedQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            debounceSearch.cancel();
        };
    }, [debounceSearch]);

    const handleResultClick = (movie) => {
        navigate(routesGen.mediaDetail(movie.slug));
        setDebouncedQuery("");
    }

    return (
        <div className="hidden md:flex items-center justify-between mx-auto my-4 h-[70px] relative">
            <div
                className="flex items-center relative flex-1 max-w-[500px]"
                ref={searchRef}
            >
                <div className="w-full min-w-[350px] flex items-center relative gap-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="pl-9 pr-10"
                        placeholder="Tìm kiếm phim..."
                        value={searchQuery}
                        onChange={onQueryChange}
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full w-9 hover:bg-transparent"
                            onClick={() => {
                                setSearchQuery("");
                                setDebouncedQuery("");
                            }}
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {data?.items && (debouncedQuery.trim().length > 0) && (
                    <div className="absolute top-full left-0 w-full max-h-[70vh] mt-4 rounded-lg shadow-lg bg-popover z-[1300] border overflow-hidden">
                        {isLoading ? (
                            <div className="flex justify-center p-4">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        ) : data?.items.length > 0 ? (
                            <ScrollArea className="h-auto max-h-[70vh]">
                                <div className="flex flex-col">
                                    {data.items.map((movie, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-start p-3 cursor-pointer hover:bg-accent transition-colors ${index !== data.items.length - 1 ? 'border-b' : ''}`}
                                            onClick={() => handleResultClick(movie)}
                                        >
                                            <Avatar className="h-[70px] w-14 rounded-none mr-2">
                                                <AvatarImage src={`https://img.ophim.live/uploads/movies/${movie.poster_url}`} alt={movie.name} className="object-cover" />
                                                <AvatarFallback className="rounded-none">IMG</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium text-foreground">{movie.name}</span>
                                                <span className="text-xs text-muted-foreground">{movie.origin_name}</span>
                                                <div className="flex gap-2 mt-0.5">
                                                    {movie.quality && (
                                                        <span className="text-[10px] bg-secondary text-secondary-foreground px-1 rounded">{movie.quality}</span>
                                                    )}
                                                    {movie.episode_current && (
                                                        <span className="text-[10px] text-muted-foreground">• {movie.episode_current}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : searchQuery.trim() ? (
                            <div className="p-4 text-center">
                                <span className="text-sm text-muted-foreground">Không tìm thấy kết quả</span>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
