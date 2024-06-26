'use client';
import styles from './NavbarItem.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import SpinnerIcon from '../../../public/images/svg/spinnerIcon.svg';
import { CategoryVacancy, Mods } from '../../..';

const NavbarItem = ({ categoryVacancy, isMobile }: { categoryVacancy: CategoryVacancy; isMobile?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { jobCategory } = useParams();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const regionCodeParams = searchParams.get('regionCode') || '';

  // const decodeSearchText = decodeURIComponent(useSearchParams().get('text') || '');

  const encodeSearchText = encodeURIComponent(useSearchParams().get('text') ?? '');

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  let url = '';

  if (categoryVacancy.jobCategory === '/vacancies') {
    url = `${categoryVacancy.jobCategory}?`;
  } else {
    url = `/vacancies/${categoryVacancy.jobCategory}?`;
  }

  if (regionCodeParams) {
    url = url + `regionCode=${regionCodeParams}&offset=0`;
  }

  if (encodeSearchText) {
    url = url + `&text=${encodeSearchText}`;
  }

  const handleCklick = () => {
    if (pathname !== `/vacancies/${categoryVacancy.jobCategory}`) {
      setIsLoading(true);
    }
  };

  const modsIcon: Mods = {
    [styles.icon__mobile]: isMobile,
  };

  const modsLink: Mods = {
    [styles['navbar__links--active']]: jobCategory === categoryVacancy.jobCategory || pathname === categoryVacancy.jobCategory,
  };

  return (
    <Link key={categoryVacancy.jobCategory} className={clsx(styles.navbar__links, modsLink)} href={url} onClick={handleCklick}>
      <div className={clsx(isMobile ? styles.navbar__name__mobile : styles.navbar__name)}>{categoryVacancy.icon}</div>
      <span className={styles['links-name']}>{categoryVacancy.name}</span>
      {isLoading && <SpinnerIcon className={clsx(styles.navbar__icon, modsIcon)} width='24' height='24' />}
    </Link>
  );
};

export default NavbarItem;
