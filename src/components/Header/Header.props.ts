import { IRegion } from "@/app/lib/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    regions: IRegion[];
}
