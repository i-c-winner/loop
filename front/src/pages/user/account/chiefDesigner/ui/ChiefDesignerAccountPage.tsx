'use client';

import { useContext } from 'react';
import { MyContext } from '@/shared/lib/context/app-context';
import AdminAccountEmpty from './AdminAccountEmpty';
import ChiefAccountEmpty from './ChiefAccountEmpty';
import DesignerAccountEmpty from './DesignerAccountEmpty';

export default function ChiefDesignerAccountPage() {
  const { currentRole } = useContext(MyContext);
  const role = (currentRole || '').toLowerCase().trim();

  if (role === 'admin') {
    return <AdminAccountEmpty />;
  }

  if (role === 'chief' || role === 'pm') {
    return <ChiefAccountEmpty />;
  }

  return <DesignerAccountEmpty />;
}
