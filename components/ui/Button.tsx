/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import cn from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  color?: 'lightBlue' | 'red' | 'white';
  full?: boolean;
  size?: 'sm' | 'base' | 'lg';
  Component?: string | React.JSXElementConstructor<any>;
}

const colorClasses = {
  lightBlue: 'bg-lightBlue-400 hover:bg-lightBlue-500 border-transparent',
  red:
    'bg-red-400 hover:bg-red-500 focus-visible:ring-red-500 border-transparent',
  white: 'bg-white hover:bg-gray-50 border-gray-300',
};

const Button = React.forwardRef<any, Props>(
  (
    {
      className,
      children,
      color = 'lightBlue',
      size = 'base',
      Component = 'button',
      full = false,
      ...props
    },
    buttonRef,
  ) => {
    return (
      <Component
        ref={buttonRef as never}
        type="button"
        className={cn(
          className,
          'px-4 py-2 inline-flex items-center border shadow-sm rounded-md font-semibold',
          {
            'text-sm': size === 'sm',
            'text-base': size === 'base',
            'text-lg': size === 'lg',
            'justify-center w-full px-1.5 py-2': full,
          },
          colorClasses[color],
          {
            'text-white disabled:text-gray-50 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-default':
              color !== 'white',
          },
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

export default Button;
