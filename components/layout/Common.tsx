import React from 'react';
import { useUI } from '../context';

import { Modal, Notification } from '@components/ui';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  const { modalFlag, modalContent, notiFlag, closeNoti, notiContent } = useUI();

  return (
    <div className="relative min-h-full w-full">
      <main className="relative">{children}</main>
      <Modal show={modalFlag} {...modalContent} />

      <Notification
        show={notiFlag}
        close={() => closeNoti()}
        variant={notiContent.variant}
        title={notiContent.title}
        content={notiContent.content}
      />
    </div>
  );
}
