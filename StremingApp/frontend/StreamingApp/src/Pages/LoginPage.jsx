import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setUser} from "../store/slices/user.slice.jsx";
import {loginUser} from "../store/services/api.jsx";
import * as yup from "yup";
import "../Styles/loginPage.scss";
import { Switch } from "@mui/material";

const validationSchema = yup.object({
    login: yup.string().required("Login is required."),
    password: yup.string().required("Password is required.").min(6, "Password must be at least 6 characters."),
});

const initialValues = {
    login: "",
    password: "",
};

export function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const userData = await loginUser(values);
            dispatch(setUser(userData)); // зберігаємо користувача в Redux
            toast.success(`${userData.message}`, { position: "top-right" });
            setTimeout(() => {
                navigate("/");
            }, 2500);
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(`An error occurred: ${error}`, { position: "top-right" });
            setErrors({ login: "Invalid login or password." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="image-container" />
            <div className="form-container">
                <h2>Welcome Back</h2>
                <p>Please enter your login and password</p>
                <ToastContainer />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="login-form">
                            <div className="form-group">
                                <Field name="login" type="text" placeholder="Login" />
                                <ErrorMessage name="login" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <Field name="password" type="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>

                            <div className="form-links">
                                <div style={{ display: "flex", justifyContent: "space-between", width: "35%", alignItems: "center" }}>
                                    <Switch color="warning" sx={{ width: 60, height: 40 }} />
                                    <h4 style={{ margin: 0 }}>Remember me</h4>
                                </div>
                                <Link to="/register" className="link">
                                    Don't have an account? Register
                                </Link>
                            </div>

                            <div>
                                <button type="submit" disabled={isSubmitting} className="button">
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
