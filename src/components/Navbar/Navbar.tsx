import Link from "next/link";
import styles from "./Navbar.module.scss";
import ItIcon from "../../../public/images/svg/itIcon.svg";
import OfficeIcon from "../../../public/images/svg/officeIcon.svg";
import FinanceIcon from "../../../public/images/svg/financeIcon.svg";
import SafetyIcon from "../../../public/images/svg/safetyIcon.svg";
import AccountingIcon from "../../../public/images/svg/accountingIcon.svg";
import ManagementIcon from "../../../public/images/svg/managementIcon.svg";
import LogistickIcon from "../../../public/images/svg/logistickIcon.svg";
import MedicineIcon from "../../../public/images/svg/medicineIcon.svg";
import SearchIcon from "../../../public/images/svg/searchIcon.svg";
import ConstructionIcon from "../../../public/images/svg/constructionIcon.svg";
import { usePathname, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { CategoryVacancy, Mods } from "@/app/lib/types";
import NavbarItem from "../NavbarItem/NavbarItem";

export const category: CategoryVacancy[] = [
    {
        name: "Поиск по вакансиям",
        jobCategory: "/vacancies",
        icon: <SearchIcon />,
        title: "Все вакансии",
    },
    {
        name: "IT",
        jobCategory: "InformationTechnology",
        icon: <ItIcon />,
        title: "Информационные технологии",
    },
    {
        name: "Офис",
        jobCategory: "DeskWork",
        icon: <OfficeIcon />,
        title: "Административная работа, секретариат, АХО",
    },
    {
        name: "Финансы",
        jobCategory: "Finances",
        icon: <FinanceIcon />,
        title: "Банки, кредит, страхование, пенсионное обеспечение",
    },
    {
        name: "Безопасность",
        jobCategory: "Safety",
        icon: <SafetyIcon />,
        title: "Безопасность, службы охраны",
    },
    {
        name: "Бухучет",
        jobCategory: "AccountingTaxesManagement",
        icon: <AccountingIcon />,
        title: "Бухгалтерия, налоги, управленческий учет",
    },
    {
        name: "Управление",
        jobCategory: "Management",
        icon: <ManagementIcon />,
        title: "Высший менеджмент",
    },
    {
        name: "Логистика",
        jobCategory: "Transport",
        icon: <LogistickIcon />,
        title: "Транспорт, автобизнес, логистика, склад, ВЭД",
    },
    {
        name: "Медицина",
        jobCategory: "Medicine",
        icon: <MedicineIcon />,
        title: "Здравоохранение и социальное обеспечение",
    },
    {
        name: "Строительство",
        jobCategory: "BuldindRealty",
        icon: <ConstructionIcon />,
        title: "Строительство, ремонт, стройматериалы, недвижимость",
    },
];

type NavbarProps = {
    showNavbar: boolean;
    regionCodeStorage?: string;
};

const Navbar = ({ showNavbar }: NavbarProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const regionCode = searchParams.get("regionCode") || "all";
    // const regionCodeStorage = localStorage.getItem("regionCode") || "all";

    const mods: Mods = {
        [styles.hidden]: showNavbar,
    };

    let url = `/vacancies?`;

    if (regionCode) {
        url = url + `regionCode=${regionCode}&`;
    }

    url = url + "offset=0";

    const urlDecode = decodeURIComponent(url);

    return (
        <nav className={clsx(styles.navbar, mods)}>
            <div className={styles.wrapper}>
                <Link
                    className={clsx(styles.navbar__links, pathname === "/vacancies" && styles["navbar__links--active"])}
                    href={urlDecode}>
                    <SearchIcon />
                    <span className={styles["links-name"]}>{"Все вакансии"}</span>
                </Link>
                {category.map((item) => {
                    return <NavbarItem key={item.jobCategory} categoryVacancy={item} />;
                })}
            </div>
        </nav>
    );
};

export default Navbar;
