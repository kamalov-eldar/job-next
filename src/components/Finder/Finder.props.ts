import { Results, VacancyRegion } from "@/app/lib/types";

export interface FinderProps {
    searchText?: string;
    offset?: string;
    jobCategory?: string;
    regionCode?: string;
    results: Results;
    regions?: VacancyRegion[];
}
