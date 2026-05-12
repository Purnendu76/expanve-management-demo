/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import type { AppRoute } from '../utils/routes';
import { SuspenseLoader } from '../components/loaders/SuspenseLoader';
import { 
  IconLayoutDashboard, 
  IconFileCheck, 
  IconBox, 
  IconFileInvoice, 
  IconShoppingCart, 
  IconWorld, 
  IconUser, 
  IconHistory 
} from '@tabler/icons-react';

// Lazy load pages
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/users'));

export const appRoutesConfig: AppRoute = {
  path: '/admin',
  // element is removed here to break circular dependency with AppLayout
  children: [
    {
      label: 'Dashboard',
      path: 'dashboard',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      ),
      icon: <IconLayoutDashboard size={20} />,
    },
    {
      label: 'Invoices',
      path: 'invoices',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      ),
      icon: <IconFileCheck size={20} />,
    },
    {
      label: 'Projects',
      path: 'projects',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      ),
      icon: <IconBox size={20} />,
    },
    {
      label: 'Work Orders',
      path: 'work-orders',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      ),
      icon: <IconFileInvoice size={20} />,
    },
    {
      label: 'Purchase Orders',
      path: 'purchase-orders',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      ),
      icon: <IconShoppingCart size={20} />,
    },
    {
      label: 'Commons',
      path: 'commons',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      ),
      icon: <IconWorld size={20} />,
      children: [],
    },
    {
      label: 'Users',
      path: 'users',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Users />
        </Suspense>
      ),
      icon: <IconUser size={20} />,
      children: [],
    },
    {
      label: 'Audit Logs',
      path: 'audit-logs',
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      ),
      icon: <IconHistory size={20} />,
    },
  ],
};
