import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <main className="app-shell">
            <aside className="showcase-panel">
                <span className="eyebrow">Recruiter Demo</span>
                <h2>Node Auth Frontend</h2>
                <p>
                    A small React app built to demonstrate how the backend registration, login, auth context, and protected employee API work together.
                </p>
                <ul className="feature-list">
                    <li>React 19 with Vite 6</li>
                    <li>Client-side regex validation</li>
                    <li>Auth state managed with useContext</li>
                    <li>Protected employee list powered by JWT</li>
                    <li>Axios-based API calls</li>
                </ul>
            </aside>

            <Outlet />
        </main>
    );
};

export default AppLayout;
