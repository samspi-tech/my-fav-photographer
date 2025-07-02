import './loginForm.css';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

const LoginForm = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Form
            onSubmit={onSubmit}
            className="vh-100 d-flex flex-column justify-content-center align-items-center"
        >
            <div className="d-flex flex-column gap-2">
                <FloatLabel>
                    <InputText id="email" type="email" />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel className="mt-4 mb-3">
                    <InputText id="password" type="password" />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <Button type="submit" label="Login" className="custom-btn" />
            </div>
        </Form>
    );
};

export default LoginForm;
