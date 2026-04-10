import { X, ChevronDown, SlidersHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const TYPES = [
    { value: "", label: "Tất cả" },
    { value: "phim-le", label: "Phim lẻ" },
    { value: "phim-bo", label: "Phim bộ" },
    { value: "hoat-hinh", label: "Hoạt hình" },
    { value: "tv-shows", label: "TV Shows" },
];

const SORT_OPTIONS = [
    { value: "", label: "Mặc định" },
    { value: "modified.time", label: "Mới cập nhật" },
    { value: "year", label: "Năm phát hành" },
    { value: "_id", label: "Mới nhất" },
];

const currentYear = new Date().getFullYear();
const YEARS = [
    { value: "", label: "Tất cả" },
    ...Array.from({ length: currentYear - 1999 }, (_, i) => {
        const year = currentYear - i;
        return { value: String(year), label: String(year) };
    }),
];

const FilterDropdown = ({ label, options, value, onChange }) => {
    const selected = options.find((o) => o.value === value);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-1.5 h-9 px-3 text-sm border-border/60 hover:border-primary/60 transition-colors ${
                        value ? "border-primary/60 text-primary bg-primary/5" : "text-muted-foreground"
                    }`}
                >
                    <span>{selected ? selected.label : label}</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto min-w-[140px]">
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`cursor-pointer ${option.value === value ? "text-primary font-medium bg-primary/5" : ""}`}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const FilterBar = ({ filters = {}, onChange }) => {
    const { type = "", year = "", sort_field = "" } = filters;
    const activeCount = [type, year, sort_field].filter(Boolean).length;

    const handleChange = (key, value) => {
        onChange({ ...filters, [key]: value });
    };

    const handleReset = () => {
        onChange({ type: "", year: "", sort_field: "" });
    };

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6 py-3 px-4 rounded-lg bg-card border border-border/40">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mr-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">Lọc</span>
            </div>

            <FilterDropdown
                label="Loại phim"
                options={TYPES}
                value={type}
                onChange={(v) => handleChange("type", v)}
            />

            <FilterDropdown
                label="Năm"
                options={YEARS}
                value={year}
                onChange={(v) => handleChange("year", v)}
            />

            <FilterDropdown
                label="Sắp xếp"
                options={SORT_OPTIONS}
                value={sort_field}
                onChange={(v) => handleChange("sort_field", v)}
            />

            {activeCount > 0 && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="h-9 px-2.5 text-sm text-muted-foreground hover:text-foreground gap-1.5 ml-1"
                >
                    <X className="h-3.5 w-3.5" />
                    Xóa bộ lọc
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-semibold w-5 h-5">
                        {activeCount}
                    </span>
                </Button>
            )}
        </div>
    );
};

export default FilterBar;
