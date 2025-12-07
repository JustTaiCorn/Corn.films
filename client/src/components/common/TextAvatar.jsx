import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TextAvatar = ({ text }) => {
  const stringToColor = (str) => {
    let hash = 0;
    let i;

    for (i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  return (
    <Avatar className="w-10 h-10">
      <AvatarFallback
        style={{ backgroundColor: stringToColor(text) }}
        className="text-white font-semibold"
      >
        {text.split(" ")[0][0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default TextAvatar;