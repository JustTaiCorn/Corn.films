import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";

const ItemCategory = ({ item }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        const isGenre = location.pathname === "/the-loai";
        const basePath = isGenre ? "/the-loai" : "/quoc-gia";
        navigate(`${basePath}/${item.slug}`, { state: { name: item.name } });
    };
    return (
        <div>
            <Button
                variant="outline"
                className="w-full p-6 capitalize rounded-full hover:bg-primary hover:text-white "
                onClick={handleClick}
            >
                {item.name}
            </Button>
        </div>
    );
};

export default ItemCategory;