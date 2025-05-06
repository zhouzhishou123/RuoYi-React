import 'normalize.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'virtual:svg-icons-register';

createRoot(document.getElementById('root')!).render(<App />);
