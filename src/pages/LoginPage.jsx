import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import { validateLoginForm } from '../utils/validators.js';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        user: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const from = location.state?.from?.pathname || '/employees';

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: ''
        }));
        setSubmitError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateLoginForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await api.post('/auth', formData);
            login(formData.user.trim().toLowerCase(), response.data.accessToken);
            navigate(from, { replace: true });
        } catch (error) {
            setSubmitError(error.response?.data?.message || 'Login failed. Please check your username and password.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="panel">
            <span className="eyebrow">Authentication</span>
            <h1>Login</h1>
            <p className="intro-text">
                Login returns an access token from the backend and stores auth state in React context.
            </p>

            <form className="form-grid" onSubmit={handleSubmit}>
                <label>
                    Username
                    <input name="user" type="text" placeholder="alice_dev" value={formData.user} onChange={handleChange} />
                    {errors.user ? <span className="field-error">{errors.user}</span> : null}
                </label>

                <label>
                    Password
                    <input name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
                    {errors.password ? <span className="field-error">{errors.password}</span> : null}
                </label>

                {submitError ? <p className="form-error">{submitError}</p> : null}

                <div className="button-row">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging In...' : 'Login'}
                    </button>
                    <button type="button" className="secondary-button" onClick={() => navigate('/register')}>
                        Back To Register
                    </button>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
