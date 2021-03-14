import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  src?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  circular?: boolean;
  badge?: boolean;
  badgeColor?: 'gray' | 'red' | 'green';
}

const Avatar: React.FC<Props> = ({
  className,
  src = null,
  size = 'lg',
  circular = true,
  badge = false,
  badgeColor = 'gray',
  ...props
}) => {
  const sizeInPixel = React.useMemo(() => {
    switch (size) {
      case 'xs':
        return 24;
      case 'sm':
        return 32;
      case 'md':
        return 40;
      case 'lg':
        return 48;
      case 'xl':
        return 56;
      case '2xl':
        return 64;
    }
  }, [size]);

  return (
    <span
      className={cn(className, 'inline-block relative', {
        'overflow-hidden bg-gray-100': src === null,
        'rounded-full': circular,
        'rounded-md': !circular,
        'w-6 h-6': size === 'xs',
        'w-8 h-8': size === 'sm',
        'w-10 h-10': size === 'md',
        'w-12 h-12': size === 'lg',
        'w-14 h-14': size === 'xl',
        'w-16 h-16': size === '2xl',
      })}
      {...props}
    >
      {!src ? (
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <img
          className={cn('w-full h-full', {
            'rounded-full': circular,
            'rounded-md': !circular,
          })}
          src={src}
          width={sizeInPixel}
          height={sizeInPixel}
          alt=""
        />
      )}
      {src !== null && badge && (
        <span
          className={cn(
            'absolute top-0 right-0 block rounded-full ring-2 ring-white',
            {
              'bg-gray-300': badgeColor === 'gray',
              'bg-red-400': badgeColor === 'red',
              'bg-green-400': badgeColor === 'green',
            },
            {
              'transform -translate-y-1/2 translate-x-1/2': !circular,
            },
            {
              'w-1.5 h-1.5': size === 'xs',
              'w-2 h-2': size === 'sm',
              'w-2.5 h-2.5': size === 'md',
              'w-3 h-3': size === 'lg',
              'w-3.5 h-3.5': size === 'xl',
              'w-4 h-4': size === '2xl',
            },
          )}
        />
      )}
    </span>
  );
};

export default Avatar;
