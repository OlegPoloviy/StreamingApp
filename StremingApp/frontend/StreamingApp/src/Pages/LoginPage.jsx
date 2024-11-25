import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from 'yup';


// Валідаційна схема для форми логіну
const validationSchema = yup.object({
    login: yup
        .string()
        .required('Login is required.'),
    password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters.')
});

// Початкові значення форми
const initialValues = {
    login: '',
    password: '',
};

export function LoginPage() {
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post("http://localhost:3030/users/signup", values,{withCredentials: true});
            console.log(response);
            alert(response.data.message);
            alert("Login successful!");
        } catch (error) {
            console.error("Login failed:", error);
            setErrors({ login: 'Invalid login or password.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <Field name="login" type="text" />
                            <ErrorMessage name="login" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                            <Link to={"/register"}>Don't have an account? Register</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
