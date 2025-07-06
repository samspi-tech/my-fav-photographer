import './login.css';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useLogin } from '../../hooks/useLogin.js';
import { FloatLabel } from 'primereact/floatlabel';
import { CascadeSelect } from 'primereact/cascadeselect';
import ErrorMessage from '../errorMessage/ErrorMessage.jsx';

const Login = () => {
    const { isLoading, error, login } = useLogin();

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
            await login(values);
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
                            id="email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                    {formik.touched.email && formik.errors.email ? (
                        <ErrorMessage error={formik.errors.email} />
                    ) : null}
                </Form.Group>

                <Form.Group>
                    <FloatLabel className="mt-4">
                        <InputText
                            id="password"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                    {formik.touched.password && formik.errors.password ? (
                        <ErrorMessage error={formik.errors.password} />
                    ) : null}
                </Form.Group>

                {isLoading ? (
                    <CascadeSelect
                        loading
                        placeholder="Logging in..."
                        className="custom-btn loading-btn mt-3"
                    />
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
