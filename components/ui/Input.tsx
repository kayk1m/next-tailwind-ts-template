import React from 'react';
import cn from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  containerClassName?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
  message?: string;
  error?: boolean;
  color?: 'lightBlue';
}

const colorClasses = {
  lightBlue:
    'border-gray-300 focus:ring-lightBlue-400 focus:border-lightBlue-400',
};

const Input: React.FC<Props> = ({
  className,
  containerClassName,
  containerProps,
  label,
  message,
  error = false,
  color = 'lightBlue',
  name,
  type,
  ...props
}) => {
  return (
    <div
      className={cn(containerClassName, 'relative text-left')}
      {...containerProps}
    >
      {label !== undefined && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 capitalize"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type ?? 'text'}
          name={name}
          className={cn(
            className,
            'block w-full pr-10 focus:outline-none sm:text-sm rounded-md',
            {
              [colorClasses[color]]: !error,
              'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': error,
            },
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={name && error ? `${name}-error` : undefined}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {message !== undefined && (
        <p
          className={cn('absolute mt-1 text-sm', {
            'text-red-600': error,
          })}
          id={name && error ? `${name}-error` : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Input;
