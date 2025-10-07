import { Routes, Route } from 'react-router';
import { AppLayout } from '@/components';
import { Events } from '@/pages';

// The workflow will generate Pages and Routes
export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Events />} />
        <Route path="/events" element={<Events />} />
      </Route>
    </Routes>
  );
};
