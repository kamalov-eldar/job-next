'use client';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { Menu, rem } from '@mantine/core';
import { IconSettings, IconPhoto, IconMessageCircle, IconTrash, IconLogin2, IconLogout2 } from '@tabler/icons-react';
import styles from './AvatarMenu.module.scss';
import AvatarButton from '../AvatarButton/AvatarButton';
import { deleteUser, logoutUser } from '@/app/lib/store/features/auth/slice/authUserSlice';

function AvatarMenu({ open }: { open: () => void }) {
  const { authUser } = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.AvatarMenu}>
      <Menu shadow='md' width={200} withArrow>
        <Menu.Target>
          <AvatarButton image={authUser?.avatar.url} name={authUser?.username} email={authUser?.email} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item className={styles.menu__item} disabled leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
            <span className={styles.menu__label}>Settings</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menu__item}
            disabled
            leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
          >
            <span className={styles.menu__label}>Messages</span>
          </Menu.Item>
          <Menu.Item className={styles.menu__item} disabled leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
            <span className={styles.menu__label}>Gallery</span>
          </Menu.Item>
          <Menu.Divider />
          {authUser ? (
            <Menu.Item
              className={styles.menu__item}
              leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
              onClick={() => dispatch(logoutUser())}
            >
              <span className={styles.menu__label}>Выйти</span>
            </Menu.Item>
          ) : (
            <Menu.Item
              className={styles.menu__item}
              onClick={open}
              leftSection={<IconLogin2 style={{ width: rem(14), height: rem(14) }} />}
            >
              <span className={styles.menu__label}>Войти</span>
            </Menu.Item>
          )}
          {authUser && (
            <Menu.Item
              onClick={() => dispatch(deleteUser(authUser?.id))}
              className={styles.menu__item}
              color='red'
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
            >
              <span className={styles.menu__label}>Удалить акаунт</span>
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default AvatarMenu;