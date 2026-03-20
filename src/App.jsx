import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RegisteredUserPage from './pages/RegisteredUserPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import EmployeeListPage from './pages/EmployeeListPage.jsx';

const App = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/register" replace />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/registered" element={<RegisteredUserPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/employees" element={<EmployeeListPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/register" replace />} />
            </Route>
        </Routes>
    );
};

export default App;
