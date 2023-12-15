import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface VacancyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    vacancy: Vacancy;
}
