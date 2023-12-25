"use client";
import styles from "./Search.module.scss";
import SearchIcon from "../../../public/images/svg/searchIcon.svg";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState, useTransition } from "react";
import clsx from "clsx";
import { plural } from "@/helpers/plural";
import useStore from "@/store/StoreProvider";
import { Button } from "@mantine/core";
import { useFormStatus } from "react-dom";
import { getVacancies, getVacanciesSearch } from "@/app/lib/data";

interface FormElements extends HTMLFormControlsCollection {
    text: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function Search({ total }: { total: number }) {
    const [inpVal, setInpValue] = useState("");
    // const [isPending, setPending] = useState(false);

    // const [isPending, startTransition] = useTransition();
    // console.log("isPending: ", isPending);

    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const jobCategory = searchParams.get("jobCategory");
    const searchText = searchParams.get("text");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");

    useEffect(() => {
        setInpValue(searchText || "");
    }, [searchText]);

    const onFormSubmit = async (e: React.FormEvent<YourFormElement>) => {
       // console.log("onFormSubmit: ");
        // setPending(true);
        const SearchParams = new URLSearchParams(searchParams);
        e.preventDefault();
        const searchText = e.currentTarget.elements.text.value;
        setInpValue(searchText);
        if (jobCategory || regionCode || offset || searchText) {
            // console.log("searchText: ", { jobCategory, regionCode, offset, searchText });
            if (jobCategory) SearchParams.set("jobCategory", jobCategory);
            if (regionCode) SearchParams.set("regionCode", regionCode);
            if (offset) SearchParams.set("offset", offset || "0");
            if (searchText) SearchParams.set("text", decodeURIComponent(searchText));
        }
        if (!searchText) {
            //  console.log("searchText-else: ", searchText);
            SearchParams.delete("text");
            replace(`?${SearchParams.toString()}`);
        }
        replace(`?${SearchParams.toString()}`);
    };

    /* const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const { status } = await getVacancies({ jobCategory, offset, regionCode, searchText });
        console.log("status: ", status);
        // setLikes(updatedLikes);
    }; */

    const forms = ["вакансия", "вакансии", "вакансий"];

    return (
        <>
            <div className={clsx(styles.search, styles.desktop)}>
                <h1 className={styles.search__title}>Поиск по вакансиям</h1>
                <form className={styles.search__form} /* action={getVacanciesSearchWith} */ onSubmit={onFormSubmit}>
                    <div className={styles.search__block}>
                        <SearchIcon className={styles.search__icon} />
                        <input
                            onChange={(e) => setInpValue(e.target.value)}
                            className={styles.search__input}
                            placeholder="Введите название должности"
                            type="text"
                            name="text"
                            value={inpVal}
                        />
                        <p className={styles.search__count}>{plural(forms, total)}</p>
                        <Button
                            // onClick={handleClick}
                            classNames={styles}
                            // disabled={isPending}
                            // loading={isPending}
                            size="lg"
                            radius={5}
                            type="submit">
                            Поиск
                        </Button>
                    </div>
                </form>
            </div>
            <div className={clsx(styles.searchbar, styles.mobile)}>
                <div className={styles.searchbar__wrapper}>
                    <div className={styles.searchbar__search}>
                        <div className={styles.searchbar__icon}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="#808D9A" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.663 11.994a5.33 5.33 0 115.33-5.33.667.667 0 01-1.332 0A3.997 3.997 0 109.49 9.49l.471-.471 4.743 4.743a.667.667 0 01-.942.943l-3.83-3.83a5.311 5.311 0 01-3.269 1.12z"></path>
                            </svg>
                        </div>
                        {/* <form className={styles.search__form} onSubmit={onFormSubmit}>
                            <input
                                onChange={(e) => setInpValue(e.target.value)}
                                className={styles.search__input}
                                // defaultValue={searchParams.get("text")?.toString() || ""}
                                placeholder="Введите название должности"
                                type="text"
                                name="text"
                                value={inpVal}
                            />
                        </form> */}
                    </div>
                </div>
                <p className={styles.search__count}>Найдено: {plural(forms, total)}</p>
            </div>
        </>
    );
}
