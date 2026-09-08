import type { ReactNode } from 'react';
import JarvisLauncher from '@/components/control/JarvisLauncher';

export default function ControlLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JarvisLauncher />
      {children}
    </>
  );
}
