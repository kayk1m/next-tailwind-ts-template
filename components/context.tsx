import { createContext, FC, useCallback, useContext, useEffect, useRef, useState } from 'react';

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
  showAlert: (err: { name: string; message: string }, autoCloseDuration?: number) => void;
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
  showAlert: () => {},
  closeNoti: () => {},
  showModal: () => {},
  closeModal: () => {},
};

export const UIContext = createContext<StateWithActions>(initialStateWithActions);

export const UIProvider: FC = ({ ...props }) => {
  const [state, setState] = useState<State>(initialState);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const closeNoti = useCallback(() => {
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

  const showNoti = useCallback(
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

  const showAlert = useCallback(
    ({ name, message }, duration) => {
      showNoti({ variant: 'alert', title: name, content: message }, duration);
    },
    [showNoti],
  );

  const closeModal = useCallback(() => {
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

  const showModal = useCallback((modal: ModalContent) => {
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

  useEffect(() => {
    const storedState = sessionStorage.getItem('@UIContext');

    if (storedState) setState({ ...JSON.parse(storedState), ...initialState });
  }, []);

  return (
    <UIContext.Provider
      value={{
        ...state,
        closeNoti,
        showNoti,
        showAlert,
        closeModal,
        showModal,
      }}
      {...props}
    />
  );
};

export function useUI() {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
}

export const ManagedUIContext: FC = ({ children }) => <UIProvider>{children}</UIProvider>;

export default ManagedUIContext;
