import { Input as ShadcnInput } from "@/components/ui/input";

const Input = ({ ...props }) => {
    return (
        <ShadcnInput
            {...props}
            className="bg-white text-black border-zinc-700 focus-visible:ring-green-500 focus-visible:border-green-500 hover:border-green-500 rounded-sm"
        />
    );
};

export default Input;
