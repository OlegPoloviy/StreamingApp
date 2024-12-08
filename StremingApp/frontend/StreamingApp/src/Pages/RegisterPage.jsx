import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from "../assets/images/register.jpg"
import {Link} from "react-router-dom";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as yup from 'yup';
import "../Styles/RegistrationPage.scss";
import 'react-toastify/dist/ReactToastify.css';


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
    const navigate = useNavigate();

    const handleSubmit = (values) => {
       axios.post("http://localhost:3030/users/register",values)
           .then(res => {
               toast.success(`${res.data}`,{position: 'top-right'})
               setTimeout(() => {
                   navigate('/')
               },2500);
               console.log(res)
           })
           .catch(err => {
               toast.error(`An error occurred with registering: ${err}`,{position: 'top-right'})
           })
    };

    return (
        <div className="container">
            <div className={"container-image"}>
                <img src={Image} alt=""/>
            </div>
            <div className="container-form">
                <ToastContainer/>
                <h2>Register</h2>
                <p>Welcome to the <b>Streaming Platform</b></p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="register-form">
                        <div className="form-group">
                            <Field name="login" type="text" placeholder={'Login'}/>
                            <ErrorMessage name="login" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <Field name="email" type="email" placeholder={'Email'}/>
                            <ErrorMessage name="email" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <Field name="password" type="password" placeholder={'Password'}/>
                            <ErrorMessage name="password" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <Field name="confirmPassword" type="password"  placeholder={'Confirm password'}/>
                            <ErrorMessage name="confirmPassword" component="div" className="error"/>
                        </div>

                        <div style={{textAlign: "center"}}>
                            <button type="submit" className={'button'}>
                                Register
                            </button>
                        </div>
                        <div className={'hadAccount'}>
                            <p>Had our account: </p>
                            <Link to={"/login"} style={{color: '#fbd38d',textDecoration: 'none'}}>Already had account</Link>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>

    );
}
