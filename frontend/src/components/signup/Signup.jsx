import './signup.css';
import { useContext } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { ref, object, string, date } from 'yup';
import { InputText } from 'primereact/inputtext';
import { useLogin } from '../../hooks/useLogin.js';
import { RadioButton } from 'primereact/radiobutton';
import { CascadeSelect } from 'primereact/cascadeselect';
import ErrorMessage from '../errorMessage/ErrorMessage.jsx';
import { UserContext } from '../../contexts/UserContext.jsx';

const Signup = ({ isVisible, handleIsVisible }) => {
    const { getMe } = useContext(UserContext);
    const { isLoading, error, signup } = useLogin(getMe);

    const yupSignupSchema = object({
        firstName: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        lastName: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        email: string().email('Invalid email').required('Required'),
        dob: date().required('Required'),
        password: string()
            .required('Required')
            .min(8, 'Password is too short')
            .max(255, 'Must be 255 characters or less'),
        confirmPassword: string()
            .required('Required')
            .oneOf([ref('password'), null], 'Password must match'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            role: 'user',
            password: '',
            confirmPassword: '',
        },
        validationSchema: yupSignupSchema,
        onSubmit: async (values) => {
            await signup(values);
        },
    });

    return (
        <div
            className={`signup-form-container d-flex justify-content-center align-items-center ${isVisible && 'slide-in'}`}
        >
            <Form
                onSubmit={formik.handleSubmit}
                className="signup-form d-flex flex-column justify-content-center align-items-center gap-3"
            >
                <div className="d-flex flex-column flex-md-row gap-3">
                    <Form.Group className="d-flex flex-column">
                        <label htmlFor="firtName">First Name</label>
                        <InputText
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <ErrorMessage error={formik.errors.firstName} />
                        ) : null}
                    </Form.Group>
                    <Form.Group className="d-flex flex-column">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <ErrorMessage error={formik.errors.lastName} />
                        ) : null}
                    </Form.Group>
                </div>
                <div className="d-flex flex-column flex-md-row gap-3">
                    <Form.Group className="d-flex flex-column">
                        <label htmlFor="email">Email</label>
                        <InputText
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <ErrorMessage error={formik.errors.email} />
                        ) : null}
                    </Form.Group>
                    <Form.Group className="d-flex flex-column">
                        <label htmlFor="dob">Date of Birth</label>
                        <Calendar
                            type="date"
                            id="dob"
                            name="dob"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.dob && formik.errors.dob ? (
                            <ErrorMessage error={formik.errors.dob} />
                        ) : null}
                    </Form.Group>
                </div>
                <Form.Group className="d-flex flex-column flex-md-row gap-2 py-3">
                    <p className="mb-0">Choose your role:</p>
                    <div className="d-flex gap-2 mx-auto">
                        <div className="d-flex align-items-center gap-1">
                            <RadioButton
                                type="radio"
                                inputId="user"
                                name="role"
                                value="user"
                                onChange={formik.handleChange}
                                checked={formik.values.role === 'user'}
                            />
                            <label htmlFor="user">User</label>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <RadioButton
                                type="radio"
                                inputId="photographer"
                                name="role"
                                value="photographer"
                                onChange={formik.handleChange}
                                checked={formik.values.role === 'photographer'}
                            />
                            <label htmlFor="photographer">Photographer</label>
                        </div>
                    </div>
                </Form.Group>
                <div className="d-flex flex-column flex-md-row gap-3">
                    <Form.Group className="d-flex flex-column">
                        <label htmlFor="email">Password</label>
                        <InputText
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <ErrorMessage error={formik.errors.password} />
                        ) : null}
                    </Form.Group>
                    <Form.Group className="d-flex flex-column">
                        <label htmlFor="email">Confirm Password</label>
                        <InputText
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                            <ErrorMessage
                                error={formik.errors.confirmPassword}
                            />
                        ) : null}
                    </Form.Group>
                </div>
                <div className="d-flex flex-column flex-md-row gap-3 w-100">
                    {isLoading ? (
                        <CascadeSelect
                            loading
                            placeholder="Logging in..."
                            className="custom-btn loading-btn w-100"
                        />
                    ) : (
                        <Button
                            type="submit"
                            label="Sign up"
                            className="custom-btn w-100"
                        />
                    )}
                    {!isLoading && (
                        <Button
                            type="button"
                            label="Cancel"
                            onClick={handleIsVisible}
                            className="cancel-btn w-100"
                        />
                    )}
                </div>
                {error && <ErrorMessage error={error} />}
            </Form>
        </div>
    );
};

export default Signup;
