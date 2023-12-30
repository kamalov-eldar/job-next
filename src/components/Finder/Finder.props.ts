import { Results, VacancyRegion } from "@/app/lib/types";

export interface FinderProps {
    searchText?: string;
    offset?: string;
    jobCategory?: string;
    regionCode?: string;
    totalPages: number;
    vacancies: Results;
    regions: VacancyRegion[];
}
