import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError(""); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error message
        setLoading(true); // Set loading to true
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: data.email, password: data.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/profile"); // Navigate to profile after successful login
            } else {
                setError("Invalid login credentials"); // Set error message
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("An error occurred during login. Please try again later.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        {error && <p className={styles.error_msg}>{error}</p>} {/* Display error message */}
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.green_btn} disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
