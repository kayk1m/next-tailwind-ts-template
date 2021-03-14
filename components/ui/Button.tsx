/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import cn from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  color?: 'lightBlue' | 'red' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  Component?: string | React.JSXElementConstructor<any>;
}

const colorClasses = {
  lightBlue: 'bg-lightBlue-400 hover:bg-lightBlue-500',
  red: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
  white: 'bg-white hover:bg-gray-50 border-gray-300',
};

const Button = React.forwardRef<any, Props>(
  (
    {
      className,
      children,
      color = 'lightBlue',
      size = 'md',
      Component = 'button',
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
          'inline-flex items-center border border-transparent font-medium shadow-sm',
          {
            'px-2.5 py-1.5 text-xs rounded ': size === 'xs',
            'px-3 py-2 text-sm leading-4 ounded-md': size === 'sm',
            'px-4 py-2 text-sm rounded-md': size === 'md',
            'px-4 py-2 text-base rounded-md': size === 'lg',
            'px-6 py-3 text-base rounded-md': size === 'xl',
          },
          colorClasses[color],
          {
            'text-white disabled:text-gray-50 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-default':
              color !== 'white',
            'text-gray-400': color === 'white',
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
