import { type ReactNode } from 'react';

interface HeaderProps {
  image: {
    src: string;
    alt: string;
  },
  children?: ReactNode;
}

export default function Header({ image, children }: HeaderProps) {
  return <header>
    <img {...image} />
    {children}
  </header>
}