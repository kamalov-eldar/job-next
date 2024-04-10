'use client';

import { useLayoutEffect } from 'react';
import styles from './page.module.scss';
import { useAppSelector } from '../lib/store/hooks';
import { Params, VacancyTransform } from '../../..';
import { selectAuthUser } from '../lib/store/features/auth/slice/authUserSlice';
import FavoritesCard from '@/components/FavoritesCard/FavoritesCard';
import { selectFavorites } from '../lib/store/features/favorites/slice/favoritesSlice';
import { redirect } from 'next/navigation';

export default function Favorites({ params, searchParams }: Params) {
  const authUser = useAppSelector(selectAuthUser);
  const favoritesVacancies = useAppSelector(selectFavorites);
  useLayoutEffect(() => {
    if (!authUser) {
      redirect('/login');
    }
  }, []);

  const searchText = searchParams?.text || '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  /* const filterFavoritesVacancies = useMemo(
    () => favoritesVacancies.filter((item) => item.user_id === authUser?.id),
    [authUser?.id, favoritesVacancies]
  ); */

  if (!authUser) {
    return null;
  }

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Избранные вакансии</h2>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {/*    <Suspense key={searchText} fallback={<VacancysSkeleton />}> */}
          {favoritesVacancies.length ? (
            favoritesVacancies?.map((item: VacancyTransform, idx: number) => {
              return (
                <FavoritesCard
                  idx={idx}
                  key={item.id}
                  jobCategory={jobCategory}
                  searchText={searchText}
                  offset={offset}
                  regionCode={regionCode}
                  vacancy={item}
                />
              );
            })
          ) : (
            <h4 className={styles.empty}>Нет избранных вакансий</h4>
          )}
          {/*   </Suspense> */}
        </div>
      </div>
    </div>
  );
}
