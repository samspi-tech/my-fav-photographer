import './login.css';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { object, string } from 'yup';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useLogin } from '../../hooks/useLogin.js';
import { FloatLabel } from 'primereact/floatlabel';
import ErrorMessage from '../errorMessage/ErrorMessage.jsx';
import { UserContext } from '../../contexts/UserContext.jsx';
import LoadingButton from '../loadingButton/LoadingButton.jsx';

const Login = () => {
    const { getMe } = useContext(UserContext);

    const { isLoading, error, login } = useLogin(getMe);

    const yupLoginSchema = object({
        email: string().required('Required').email('Invalid email address'),
        password: string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yupLoginSchema,
        onSubmit: async (values) => {
            await login('/success', values);
        },
    });

    return (
        <Form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column justify-content-center align-items-center gap-5"
        >
            <div className="d-flex flex-column gap-2">
                <Form.Group>
                    <FloatLabel>
                        <InputText
                            id="loginEmail"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="loginEmail">Email</label>
                    </FloatLabel>
                    {formik.touched.email && formik.errors.email ? (
                        <ErrorMessage error={formik.errors.email} />
                    ) : null}
                </Form.Group>

                <Form.Group>
                    <FloatLabel className="mt-4">
                        <InputText
                            id="loginPassword"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="loginPassword">Password</label>
                    </FloatLabel>
                    {formik.touched.password && formik.errors.password ? (
                        <ErrorMessage error={formik.errors.password} />
                    ) : null}
                </Form.Group>

                {isLoading ? (
                    <div className="mt-3">
                        <LoadingButton />
                    </div>
                ) : (
                    <Button
                        type="submit"
                        label="Login"
                        className="custom-btn mt-3"
                    />
                )}
            </div>
            {error && <ErrorMessage error={error} />}
        </Form>
    );
};

export default Login;
