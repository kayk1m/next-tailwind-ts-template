import React from 'react';
import NextLink from 'next/link';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  href?: string;
  as?: string;
}

const Link: React.FC<Props> = ({ href, as, children, className, ...props }) => {
  if (href === undefined) {
    return (
      <a className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} as={as}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
