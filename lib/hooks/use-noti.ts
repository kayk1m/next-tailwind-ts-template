import { useCallback, useRef } from 'react';
import useSWR from 'swr';

import type { NotificationProps } from '@components/ui/Notification';

const NOTI_KEY = '@noti' as const;

const initialNotiProps: NotificationProps = {
  show: false,
  title: 'Empty Notification',
  close: () => {},
};

export function useNoti() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { data: noti, mutate: setNoti } = useSWR<Omit<NotificationProps, 'close'>>(NOTI_KEY, {
    fallbackData: initialNotiProps,
    fetcher: undefined,
  });

  const closeNoti = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setNoti((prevNoti) => ({ ...prevNoti!, show: false }), false);
    setTimeout(() => {
      setNoti(initialNotiProps, false);
    }, 100);
  }, [setNoti]);

  const showNoti = useCallback(
    (notiProps: Omit<NotificationProps, 'show' | 'close'>, autoCloseDuration: number = 3) => {
      setNoti({ ...notiProps, show: true }, false);

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => closeNoti(), autoCloseDuration * 1000);
    },
    [setNoti, closeNoti],
  );

  const showAlert = useCallback(
    (err: { name: string; message: string }, autoCloseDuration: number = 3) => {
      showNoti({ variant: 'alert', title: err.name, content: err.message }, autoCloseDuration);
    },
    [showNoti],
  );

  return { noti: noti!, showNoti, showAlert, closeNoti };
}
