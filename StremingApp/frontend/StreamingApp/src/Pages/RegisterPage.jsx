import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link} from "react-router-dom";
import axios from "axios";
import * as yup from 'yup';
import "../Styles/RegistrationPage.scss";


const validationSchema = yup.object({
    login: yup
        .string()
        .required('Login is required.')
        .min(3, 'Login must be at least 3 characters.')
        .max(20, 'Login cannot exceed 20 characters.'),
    email: yup
        .string()
        .required('Email is required.')
        .email('Invalid email address.'),
    password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required.')
        .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

// Початкові значення форми
const initialValues = {
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export function RegisterPage() {
    const handleSubmit = (values) => {
       axios.post("http://localhost:3030/users/register",values)
           .then(res => console.log(res))

    };

    return (
        <div className="register-container">
            <h2>Register Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                    <Form className="register-form">
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <Field name="login" type="text" />
                            <ErrorMessage name="login" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" />
                            <ErrorMessage name="confirmPassword" component="div" className="error" />
                        </div>

                        <div style={{textAlign: "center"}}>
                            <button type="submit">
                                Register
                            </button>
                            <Link to={"/login"}>Already had account</Link>
                        </div>

                    </Form>
            </Formik>
        </div>
    );
}
