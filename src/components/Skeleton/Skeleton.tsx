import { CSSProperties, memo } from "react";
import clsx from "clsx";
import stls from "./Skeleton.module.scss";

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    minWidth?: string | number;
    borderRadius: string;
    paddingTop: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, height, width, borderRadius, paddingTop, minWidth } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius,
        paddingTop,
        minWidth,
    };

    return <div className={clsx(stls.skeleton, [className])} style={styles} />;
});