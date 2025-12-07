import { CheckCircle, XCircle } from "lucide-react";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        {
            label: "Contains special character",
            met: /[^A-Za-z0-9]/.test(password),
        },
    ];

    return (
        <div className="mt-2 flex flex-col gap-1 text-gray-400">
            {criteria.map((item) => (
                <div
                    key={item.label}
                    className="flex items-center gap-2"
                >
                    {item.met ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                        <XCircle className="h-4 w-4 text-gray-500" />
                    )}
                    <span className={`text-xs ${item.met ? "text-green-500" : "text-gray-400"}`}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default PasswordCriteria;