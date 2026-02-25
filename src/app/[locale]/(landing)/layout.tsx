import { ReactNode } from 'react';
import LandingShell from '@/components/banana/LandingShell';

export default function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LandingShell>{children}</LandingShell>;
}
