import { Input as ShadcnInput } from "@/components/ui/input";

const Input = ({ ...props }) => {
    return (
        <ShadcnInput
            {...props}
            className="bg-white text-black border-zinc-700 focus-visible:ring-gray-800 focus-visible:border-gray-500 hover:border-gray-500 rounded-sm"
        />
    );
};

export default Input;
