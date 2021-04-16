import React from 'react';
import { useUI } from './context';

// contexts
import Modal from './Modal';
import Notification from './Notification';

// components

const Layout: React.FC = ({ children }) => {
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
};

export default Layout;
