import {useEffect, useLayoutEffect, useMemo,useState} from "react";

const DEFAULT_OVERSCAN = 3;
const DEFAULT_SCROLLING_DELAY = 150;

export function useVirtualization(props) {
    const {
        itemHeight,
        itemsCount,
        scrollingDelay = DEFAULT_SCROLLING_DELAY,
        overscan = DEFAULT_OVERSCAN,
        getScrollElement,
    } = props;

    const [scrollTop, setScrollTop] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [listHeight,setListHeight] = useState(0)

    useLayoutEffect(() => {
        const scrollElement = getScrollElement();

        if (!scrollElement) {
            return;
        }

        const resizeObserver = new ResizeObserver(([entry]) => {
            if (!entry) {
                return;
            }
            const height =
                entry.borderBoxSize[0]?.blockSize ??
                entry.target.getBoundingClientRect().height;

            setListHeight(height);
        });

        resizeObserver.observe(scrollElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, [getScrollElement]);    useLayoutEffect(() => {
        const scrollElement = getScrollElement();

        if (!scrollElement) {
            return;
        }

        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop;

            setScrollTop(scrollTop);
        };

        handleScroll();

        scrollElement.addEventListener("scroll", handleScroll);

        return () => scrollElement.removeEventListener("scroll", handleScroll);
    }, [getScrollElement]);

    useEffect(() => {
        const scrollElement = getScrollElement();

        if (!scrollElement) {
            return;
        }

        let timeoutId = null;

        const handleScroll = () => {
            setIsScrolling(true);

            if (typeof timeoutId === "number") {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, scrollingDelay);
        };

        scrollElement.addEventListener("scroll", handleScroll);

        return () => {
            if (typeof timeoutId === "number") {
                clearTimeout(timeoutId);
            }
            scrollElement.removeEventListener("scroll", handleScroll);
        };
    }, [getScrollElement]);

    const { virtualItems, startIndex, endIndex } = useMemo(() => {
        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + listHeight;

        let startIndex = Math.floor(rangeStart / itemHeight);
        let endIndex = Math.ceil(rangeEnd / itemHeight);

        startIndex = Math.max(0, startIndex - overscan);
        endIndex = Math.min(itemsCount - 1, endIndex + overscan);

        const virtualItems = [];

        for (let index = startIndex; index <= endIndex; index++) {
            virtualItems.push({
                index,
                offsetTop: index * itemHeight,
            });
        }
        return { virtualItems, startIndex, endIndex };
    }, [scrollTop, listHeight, itemsCount]);

    const totalHeight = itemHeight * itemsCount;

    return {
        virtualItems,
        totalHeight,
        startIndex,
        endIndex,
        isScrolling,
    };
}
