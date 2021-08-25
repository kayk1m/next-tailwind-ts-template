import { useUI } from '../context';

import { Modal, Notification } from '@components/ui';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  const { modalFlag, modalContent, notiFlag, closeNoti, notiContent } = useUI();

  return (
    <div className="relative h-full w-full">
      <main className="relative h-full">{children}</main>

      <Modal show={modalFlag} {...modalContent} />
      <Notification show={notiFlag} close={closeNoti} {...notiContent} />
    </div>
  );
}
