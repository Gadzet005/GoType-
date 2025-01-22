import React from "react";

export function useKeyboard(key: string, callback: () => void) {
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === key) {
            callback();
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, []);
}
