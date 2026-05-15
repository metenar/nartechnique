import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'normal' | 'large';
  href?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  href,
  fullWidth,
  className = '',
  ...props
}) => {
  const classes = [
    styles.btn,
    styles[variant],
    size === 'large' ? styles.large : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
