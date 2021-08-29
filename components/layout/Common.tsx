import { Modal, Notification } from '@components/ui';

import { useModal } from '@lib/hooks/use-modal';
import { useNoti } from '@lib/hooks/use-noti';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  const { modal, closeModal } = useModal();
  const { noti, closeNoti } = useNoti();

  return (
    <div className="relative h-full w-full">
      <main className="relative h-full">{children}</main>

      <Modal {...modal} close={closeModal} />
      <Notification {...noti} close={closeNoti} />
    </div>
  );
}
