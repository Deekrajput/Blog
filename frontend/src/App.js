import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/profile/Profile";
import CreatePost from "./components/Posts/Createpost";
import BlogState from "./context/blogstate";
import Update from './components/update/Update';
import PrivateRoute from  "./Private"; // 
const AppContent = () => {

    // const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(localStorage.getItem("token"));
    // const navigate = useNavigate();

    // if (loading) {
    //     return <div>Loading...</div>;
    // }



    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route 
                path="/profile" 
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/createpost" 
                element={
                    <PrivateRoute>
                        <CreatePost />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/update" 
                element={
                    <PrivateRoute>
                        <Update />
                    </PrivateRoute>
                } 
            />
        </Routes>
    );
};

function MainApp() {
    return (
        <BlogState>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </BlogState>
    );
}

export default MainApp;