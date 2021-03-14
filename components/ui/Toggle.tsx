import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  enabled: boolean;
  size?: 'sm' | 'md';
  onChange: (enabled: boolean) => void;
  withIcon?: boolean;
  playPause?: boolean;
  screenReaderLabel?: string;
}

const Toggle: React.FC<Props> = ({
  className,
  enabled,
  size = 'md',
  onChange,
  withIcon = false,
  playPause = false,
  screenReaderLabel,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        className,
        'relative inline-flex flex-shrink-0 rounded-full cursor-pointer',
        'focus-visible:ring-primary',
        {
          'h-5 w-10 group items-center justify-center ': size === 'sm',
          'h-6 w-11 border-2 border-transparent transition-colors ease-in-out duration-200 ':
            size === 'md',
        },
        {
          'bg-primary': enabled,
          'bg-gray-200': !enabled,
        },
      )}
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled ? 'true' : 'false'}
      {...props}
    >
      {screenReaderLabel !== undefined && (
        <span className="sr-only">{screenReaderLabel}</span>
      )}
      {size === 'sm' && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bg-white w-full h-full rounded-md"
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200',
              {
                'bg-primary': enabled,
                'bg-gray-200': !enabled,
              },
            )}
          />
        </>
      )}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none flex justify-center items-center h-5 w-5 rounded-full bg-white shadow transform ring-0 ease-in-out duration-200',
          {
            'absolute left-0 border border-gray-200 transition-transform':
              size === 'sm',
            transition: size === 'md',
          },
          {
            'translate-x-5': enabled,
            'translate-x-0': !enabled,
          },
        )}
      >
        {withIcon && (
          <>
            <span
              className={cn(
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                {
                  'opacity-0 ease-out duration-100': enabled,
                  'opacity-100 ease-in duration-200': !enabled,
                },
              )}
              aria-hidden="true"
            >
              {playPause ? (
                <svg
                  className="bg-white h-3 w-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 4.5H7.5C7.10218 4.5 6.72064 4.65804 6.43934 4.93934C6.15804 5.22064 6 5.60218 6 6V18C6 18.3978 6.15804 18.7794 6.43934 19.0607C6.72064 19.342 7.10218 19.5 7.5 19.5H9C9.39782 19.5 9.77936 19.342 10.0607 19.0607C10.342 18.7794 10.5 18.3978 10.5 18V6C10.5 5.60218 10.342 5.22064 10.0607 4.93934C9.77936 4.65804 9.39782 4.5 9 4.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16.5 4.5H15C14.6022 4.5 14.2206 4.65804 13.9393 4.93934C13.658 5.22064 13.5 5.60218 13.5 6V18C13.5 18.3978 13.658 18.7794 13.9393 19.0607C14.2206 19.342 14.6022 19.5 15 19.5H16.5C16.8978 19.5 17.2794 19.342 17.5607 19.0607C17.842 18.7794 18 18.3978 18 18V6C18 5.60218 17.842 5.22064 17.5607 4.93934C17.2794 4.65804 16.8978 4.5 16.5 4.5Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  className="bg-white h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={cn(
                'opacity-0 ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                {
                  'opacity-100 ease-in duration-200': enabled,
                  'opacity-0 ease-out duration-100': !enabled,
                },
              )}
              aria-hidden="true"
            >
              {playPause ? (
                <svg
                  className={cn('bg-white h-3 w-3', 'text-primary')}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.394 13.045L7.8495 18.583C7.0395 19.0525 6 18.484 6 17.5375V6.46155C6 5.51655 7.038 4.94655 7.8495 5.41755L17.394 10.9555C17.5783 11.0607 17.7314 11.2128 17.8379 11.3963C17.9445 11.5797 18.0006 11.7881 18.0006 12.0003C18.0006 12.2125 17.9445 12.4209 17.8379 12.6043C17.7314 12.7878 17.5783 12.9399 17.394 13.045Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  className={cn('bg-white h-3 w-3', 'text-primary')}
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              )}
            </span>
          </>
        )}
      </span>
    </button>
  );
};

export default Toggle;
