import React from "react";

export function useKeyboard(
    key: string | null,
    callback: (event: KeyboardEvent) => void
) {
    const handleKeydown = (event: KeyboardEvent) => {
        if (key === null || event.key === key) {
            callback(event);
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, []);
}
