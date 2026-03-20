import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { validateRegisterForm } from '../utils/validators.js';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: '',
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        const validationErrors = validateRegisterForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            await api.post('/register', {
                user: formData.user,
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password
            });

            navigate('/registered', {
                state: {
                    registeredUser: {
                        username: formData.user.trim().toLowerCase(),
                        fullname: formData.fullname.trim(),
                        email: formData.email.trim().toLowerCase()
                    }
                }
            });
        } catch (error) {
            setSubmitError(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="panel panel-wide">
            <span className="eyebrow">Frontend Showcase</span>
            <h1>Register New User</h1>
            <p className="intro-text">
                This demo frontend runs on a different port and talks to the Node.js auth API to show how registration works.
            </p>

            <form className="form-grid" onSubmit={handleSubmit}>
                <label>
                    Username
                    <input name="user" type="text" placeholder="alice_dev" value={formData.user} onChange={handleChange} />
                    {errors.user ? <span className="field-error">{errors.user}</span> : null}
                </label>

                <label>
                    Full Name
                    <input name="fullname" type="text" placeholder="Alice Johnson" value={formData.fullname} onChange={handleChange} />
                    {errors.fullname ? <span className="field-error">{errors.fullname}</span> : null}
                </label>

                <label>
                    Email
                    <input name="email" type="email" placeholder="alice@example.com" value={formData.email} onChange={handleChange} />
                    {errors.email ? <span className="field-error">{errors.email}</span> : null}
                </label>

                <label>
                    Password
                    <input name="password" type="password" placeholder="SecurePass@123" value={formData.password} onChange={handleChange} />
                    {errors.password ? <span className="field-error">{errors.password}</span> : null}
                </label>

                <label>
                    Confirm Password
                    <input name="confirmPassword" type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword ? <span className="field-error">{errors.confirmPassword}</span> : null}
                </label>

                {submitError ? <p className="form-error">{submitError}</p> : null}

                <div className="button-row">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <button type="button" className="secondary-button" onClick={() => navigate('/login')}>
                        Go To Login
                    </button>
                </div>
            </form>
        </section>
    );
};

export default RegisterPage;
