import React from 'react';

interface NotiContent {
  variant?: 'default' | 'alert';
  title: string;
  content?: string;
}

interface ModalContent {
  variant?: 'default' | 'alert';
  title: string;
  content: string;
  actionButton: {
    label: string;
    onClick: () => void;
  };
  cancelButton: {
    label: string;
    onClick: () => void;
  };
}

export interface State {
  notiFlag: boolean;
  notiContent: NotiContent;
  modalFlag: boolean;
  modalContent: ModalContent;
}

export interface StateWithActions extends State {
  showNoti: (noti: NotiContent, autoCloseDuration?: number) => void;
  closeNoti: () => void;
  showModal: (modal: ModalContent) => void;
  closeModal: () => void;
}

const initialState: State = {
  notiFlag: false,
  notiContent: { title: '' },
  modalFlag: false,
  modalContent: {
    title: '',
    content: '',
    actionButton: { label: '확인', onClick: () => {} },
    cancelButton: { label: '취소', onClick: () => {} },
  },
};

const initialStateWithActions: StateWithActions = {
  ...initialState,
  showNoti: () => {},
  closeNoti: () => {},
  showModal: () => {},
  closeModal: () => {},
};

export const UIContext = React.createContext<StateWithActions>(
  initialStateWithActions,
);

export const UIProvider: React.FC = ({ ...props }) => {
  const [state, setState] = React.useState<State>(initialState);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const closeNoti = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);

    setState((prev) => {
      const updatedState: State = {
        ...prev,
        notiFlag: false,
      };
      // sessionStorage.setItem('@UIContext', JSON.stringify(updatedState));
      return updatedState;
    });
    setTimeout(() => {
      setState((prev) => {
        const updatedState: State = {
          ...prev,
          notiContent: { variant: 'default', title: '', content: '' },
          notiFlag: false,
        };
        // sessionStorage.setItem('@UIContext', JSON.stringify(updatedState));
        return updatedState;
      });
    }, 100);
  }, []);

  const showNoti = React.useCallback(
    (
      notiContent: {
        variant?: 'default' | 'alert';
        title: string;
        content?: string;
      },
      duration?: number,
    ) => {
      setState((prev) => {
        const updatedState: State = {
          ...prev,
          notiContent,
          notiFlag: true,
        };
        // sessionStorage.setItem('@UIContext', JSON.stringify(updatedState));
        return updatedState;
      });

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => closeNoti(), (duration ?? 3) * 1000);
    },
    [closeNoti],
  );

  const closeModal = React.useCallback(() => {
    setState((prev) => {
      const updatedState: State = {
        ...prev,
        modalFlag: false,
      };
      sessionStorage.setItem('@UIContext', JSON.stringify(updatedState));
      return updatedState;
    });
    setTimeout(() => {
      setState((prev) => {
        const updatedState: State = {
          ...prev,
          modalContent: {
            title: '',
            content: '',
            actionButton: { label: '확인', onClick: () => {} },
            cancelButton: { label: '취소', onClick: () => {} },
          },
          modalFlag: false,
        };
        sessionStorage.setItem('@UIContext', JSON.stringify(updatedState));
        return updatedState;
      });
    }, 300);
  }, []);

  const showModal = React.useCallback((modal: ModalContent) => {
    setState((prev) => {
      const updatedState: State = {
        ...prev,
        modalContent: modal,
        modalFlag: true,
      };
      sessionStorage.setItem('@UIContext', JSON.stringify(updatedState));
      return updatedState;
    });
  }, []);

  React.useEffect(() => {
    const storedState = sessionStorage.getItem('@UIContext');

    if (storedState)
      setState({
        ...JSON.parse(storedState),
        notiFlag: false,
        notiContent: { variant: 'default', title: '', content: '' },
        modalFlag: false,
        modalContent: {
          title: '',
          content: '',
          actionButton: { label: '확인', onClick: () => {} },
          cancelButton: { label: '취소', onClick: () => {} },
        },
        muted: true,
      });
  }, []);

  return (
    <UIContext.Provider
      value={{
        ...state,
        closeNoti,
        showNoti,
        closeModal,
        showModal,
      }}
      {...props}
    />
  );
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default ManagedUIContext;
