import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(""); // State for error messages
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		setError(""); // Clear error message on input change
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/api/auth/createuser", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstname: data.firstname,
					lastname: data.lastname,
					email: data.email,
					password: data.password
				})
			});

			const json = await response.json();
			console.log('Response JSON:', json);

			if (json.success) {
				// Save the auth token and redirect
				localStorage.setItem('token', json.authtoken);
				navigate("/profile");
			} else {
				// Set error message from server response
				setError(json.message || "An error occurred during signup.");
			}
		} catch (error) {
			console.error('Error during signup:', error);
			setError("An error occurred during signup. Please try again later.");
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign In
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						{error && <div className={styles.error_msg}>{error}</div>} {/* Display error message */}
						<input
							type="text"
							placeholder="First Name"
							name="firstname"
							onChange={handleChange}
							value={data.firstname}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastname"
							onChange={handleChange}
							value={data.lastname}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
