import { useLocation, useNavigate } from "react-router-dom";

const RegisteredUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registeredUser = location.state?.registeredUser;

  return (
    <section className="panel">
      <span className="eyebrow">Registration Success</span>
      <h1>User Created</h1>

      {registeredUser ? (
        <div className="details-card">
          <p>
            <strong>Username:</strong> {registeredUser.username}
          </p>
          <p>
            <strong>Full Name:</strong> {registeredUser.fullname}
          </p>
          <p>
            <strong>Email:</strong> {registeredUser.email}
          </p>
        </div>
      ) : (
        <p className="intro-text">
          No registration data found. Please create a user first.
        </p>
      )}

      <div className="link-row">
        <button onClick={() => navigate("/login")}>Login Now</button>
        <button
          className="secondary-button"
          onClick={() => navigate("/register")}
        >
          Register Another User
        </button>
      </div>
    </section>
  );
};

export default RegisteredUserPage;
