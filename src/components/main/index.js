import Profile from "../profile/Profile";
import styles from "./style.module.css";
// import { useNavigate } from "react-router-dom";
const Main = () => {
	// const navigate=useNavigate()
	// const handleLogout = () => {
	// 	localStorage.removeItem("token");
	// 	// window.location.reload();
	// 	navigate("/login")
	// };

	return (
		<div className={styles.main_container}>
			<Profile></Profile>
			
		</div>
	);
};

export default Main;