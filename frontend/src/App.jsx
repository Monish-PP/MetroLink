import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Corridors from './pages/Corridors';
import CableCars from './pages/CableCars';
import Telemetry from './pages/Telemetry';
import Alerts from './pages/Alerts';
import Finance from './pages/Finance';
import Accounting from './pages/Accounting';
import Passengers from './pages/Passengers';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/corridors" element={<Corridors />} />
                    <Route path="/cable-cars" element={<CableCars />} />
                    <Route path="/telemetry" element={<Telemetry />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/accounting" element={<Accounting />} />
                    <Route path="/passengers" element={<Passengers />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}


