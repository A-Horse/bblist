import {  useEffect, useRef, useState } from "react";

export function useHover(elementRef?) {
    const [value, setValue] = useState(false);

    const ref = useRef<HTMLElement>(null);
    const actualRef = elementRef || ref;

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(() => {
        const node = actualRef.current;
        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);

            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, [actualRef]);

    return [actualRef, value];
}
