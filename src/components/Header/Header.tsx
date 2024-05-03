'use client';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { HeaderProps } from './Header.props';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './Header.module.scss';
import Navbar from '../Navbar/Navbar';
import clsx from 'clsx';
import RegionName from '../RegionName/RegionName';
import PointIcon from '../../../public/images/svg/PointIcon';
import SignModal from '../ModalSignin/ModalSignin';
import { useDisclosure } from '@mantine/hooks';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import { IconStar } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { UnstyledButton } from '@mantine/core';
import { AnimatedModal } from '../AnimatedModal';
import { useSession } from 'next-auth/react';

const MobileRegionsModal = dynamic(() => import('../ModalMobileRegions/ModalMobileRegions'), {
  ssr: false,
});

const DesktopRegionsModal = dynamic(() => import('../DesktopRegionsModal/DesktopRegionsModal'), {
  ssr: false,
});

const Sidebar = dynamic(() => import('../Sidebar/Sidebar'), {
  ssr: false,
});

const Header = ({ regions }: HeaderProps): JSX.Element => {
  console.log('Header: ');
  const router = useRouter();
  const pathname = usePathname();
  const { jobCategory } = useParams<{ jobCategory: string }>();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMobileRegionsModal, setMobileShowRegionsModal] = useState(false);
  const [showDesktopRegionsModal, setDesktopShowRegionsModal] = useState(false);
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const regionCodeParams = searchParams.get('regionCode');

  const onToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const onCloseSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);

  const onCloseMobileRegionsModal = useCallback(() => {
    setMobileShowRegionsModal((prev) => !prev);
  }, []);

  const onCloseDesktopRegionsModal = useCallback(() => {
    setDesktopShowRegionsModal((prev) => !prev);
  }, []);

  const handleFavoritesClick = () => {
    if (user) {
      router.push('/favorites');
    } else {
      open();
    }
  };

  const isAuthRoute = useMemo(() => {
    if (jobCategory) {
      return pathname === `/vacancies/${jobCategory}`;
    }
    return pathname === `/vacancies`;
  }, [pathname, jobCategory]);

  /* let url = `/`;

  if (regionCodeParams) {
    url = url + `?regionCode=${regionCodeParams}`;
  } */

  return (
    <>
      <header className={clsx(styles.desktop)}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Link prefetch={false} className={styles.header__logo} href={'/'}>
              JOB/
            </Link>
            <div className={styles.header__info}>
              <div className={styles.info__cities}>
                <Link prefetch={false} href={'/login'}>
                  login
                </Link>
                <Link prefetch={false} href={'/favorites'}>
                  favorites
                </Link>
                <Link prefetch={false} href={'/vacancies'}>
                  vacancies
                </Link>
                <svg width='1' height='46' viewBox='0 0 1 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path fill='#fff' d='M0 0h1v46H0z'></path>
                </svg>
              </div>

              <div className={styles.info__cities} onClick={onCloseDesktopRegionsModal}>
                <RegionName regions={regions} />
                <div className={styles['city-logo']}>
                  <PointIcon style={{ width: 24, height: 24, color: '#ffffff' }} />
                </div>
              </div>
              <div className={styles.info__avatar}>
                <svg width='1' height='46' viewBox='0 0 1 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path fill='#fff' d='M0 0h1v46H0z'></path>
                </svg>
                <UnstyledButton onClick={handleFavoritesClick} className={styles.header__favorites}>
                  <IconStar className={styles.star__icon} />
                </UnstyledButton>
                <AvatarMenu openSignModal={open} />
              </div>
            </div>
          </div>
        </div>
        {session?.user && isAuthRoute && <Navbar />}
      </header>

      <div className={clsx(styles.mobile, styles.sticky)}>
        <div className={styles.mobile__main}>
          <button onClick={onToggleSidebar}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M14.222 17c.295 0 .578.105.786.293a.952.952 0 01.325.707c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.112c-.296 0-.578-.105-.787-.293A.952.952 0 012 18c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293h11.111zm6.667-6c.295 0 .577.105.786.293A.952.952 0 0122 12c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.11c-.295 0-.577-.105-.786-.293A.952.952 0 012 12c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293H20.89zm0-6c.295 0 .577.105.786.293A.952.952 0 0122 6c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.11c-.295 0-.577-.105-.786-.293A.952.952 0 012 6c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293H20.89z'
                fill='#fff'
              ></path>
            </svg>
          </button>
          <Link prefetch={false} className={styles.header__logo} href={`/`}>
            JOB
          </Link>
          <div></div>
        </div>

        {showSidebar && (
          <Sidebar
            regions={regions}
            showSidebar={showSidebar}
            onCloseSidebar={onCloseSidebar}
            onCloseMobileRegionsModal={onCloseMobileRegionsModal}
          />
        )}
      </div>

      <AnimatedModal opened={showDesktopRegionsModal} onClose={onCloseDesktopRegionsModal}>
        <DesktopRegionsModal regions={regions} onClose={onCloseDesktopRegionsModal} />
      </AnimatedModal>

      <SignModal opened={opened} openModal={open} closeModal={close} />

      {showMobileRegionsModal && (
        <MobileRegionsModal
          showMobileRegionsModal={showMobileRegionsModal}
          regions={regions}
          onCloseMobileRegionsModal={onCloseMobileRegionsModal}
        />
      )}
    </>
  );
};

export default Header;
