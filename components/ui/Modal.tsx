import React from 'react';
import cn from 'classnames';
import { Transition } from '@headlessui/react';
import ScrollLock from 'react-scrolllock';

interface Props {
  dialogClassName?: string;
  containerClassName?: string;
  show: boolean;
  variant?: 'default' | 'alert';
  title: string;
  content: string;
  cancelButton?: {
    label: string;
    onClick: () => void;
  };
  actionButton: {
    label: string;
    onClick: () => void;
  };
  close: () => void;
  dialogProps?: React.AllHTMLAttributes<HTMLDivElement>;
}

const Modal: React.FC<Props> = ({
  dialogClassName,
  containerClassName,
  show,
  variant = 'default',
  title,
  content,
  cancelButton,
  actionButton,
  close,
  dialogProps,
  ...props
}) => {
  return (
    <Transition
      show={show}
      className={cn(containerClassName, 'fixed z-10 inset-0 overflow-y-hidden')}
      {...props}
    >
      <ScrollLock isActive={show} />
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-40 text-center sm:block sm:p-0">
        <Transition.Child
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Transition.Child
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          enter="eease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            className={cn(dialogClassName, {
              'sm:flex sm:items-start': variant === 'alert',
            })}
            {...dialogProps}
          >
            <div
              className={cn(
                'mx-auto flex items-center justify-center h-12 w-12 rounded-full',
                {
                  'bg-green-100': variant === 'default',
                  'flex-shrink-0 bg-red-100 sm:mx-0 sm:h-10 sm:w-10':
                    variant === 'alert',
                },
              )}
            >
              {/* <!-- Heroicon name: outline/check --> */}
              {variant === 'default' && (
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {variant === 'alert' && (
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              )}
            </div>
            <div
              className={cn('mt-3 text-center', {
                'sm:mt-5': variant === 'default',
                'sm:mt-0 sm:ml-4 sm:text-left': variant === 'alert',
              })}
            >
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{content}</p>
              </div>
            </div>
          </div>
          <div
            className={cn('mt-5', {
              'sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense':
                variant === 'default',
              'sm:mt-4 sm:flex sm:flex-row-reverse': variant === 'alert',
            })}
          >
            <button
              type="button"
              className={cn(
                'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm',
                {
                  'bg-primary hover:bg-lightBlue-500 sm:col-start-2':
                    variant === 'default',
                  'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 sm:ml-3 sm:w-auto':
                    variant === 'alert',
                },
              )}
              onClick={() => {
                actionButton.onClick();
              }}
            >
              {actionButton.label}
            </button>
            {cancelButton && (
              <button
                type="button"
                className={cn(
                  'mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:text-sm',
                  {
                    'sm:col-start-1': variant === 'default',
                    'sm:w-auto': variant === 'alert',
                  },
                )}
                onClick={() => {
                  close();
                  cancelButton.onClick();
                }}
              >
                {cancelButton.label}
              </button>
            )}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Modal;
