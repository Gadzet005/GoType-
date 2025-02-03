import React from "react";

export function useKeyboard(
    key: string | null,
    callback: (event: KeyboardEvent) => void
) {
    const handleKeydown = React.useCallback(
        (event: KeyboardEvent) => {
            if (key === null || event.key === key) {
                callback(event);
            }
        },
        [key, callback]
    );

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [handleKeydown]);
}
