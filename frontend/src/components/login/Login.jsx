import './login.css';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useLogin } from '../../hooks/useLogin.js';

const Login = () => {
    const { payload, handlePayload, login } = useLogin();
    const { email, password } = payload;

    const onSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <Form
            onSubmit={onSubmit}
            className="d-flex flex-column justify-content-center align-items-center gap-5"
        >
            <div className="d-flex flex-column gap-2">
                <FloatLabel>
                    <InputText
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handlePayload}
                    />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel className="mt-4 mb-3">
                    <InputText
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePayload}
                    />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <Button type="submit" label="Login" className="custom-btn" />
            </div>
        </Form>
    );
};

export default Login;
