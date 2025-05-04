import { createBrowserRouter } from 'react-router-dom';
import { constantRoutes } from './routes';

const router = createBrowserRouter(constantRoutes, {
  future: {
    v7_relativeSplatPath: true
  }
