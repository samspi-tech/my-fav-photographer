import { useFormik } from 'formik';
import { object, string, date } from 'yup';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Col, Form, Row } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { CascadeSelect } from 'primereact/cascadeselect';
import ErrorMessage from '../../errorMessage/ErrorMessage.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';
import { useAvatarUpload } from '../../../hooks/useAvatarUpload.js';
import { getFromSessionStorage } from '../../../utils/sessionStorage.js';

const UpdateProfile = ({ user }) => {
    const { getMe } = useContext(UserContext);
    const { firstName, lastName, email, dob } = user;

    const { isLoading, uploadAvatarOnCloudinary, handleProfileUpdate } =
        useAvatarUpload();

    const loggedInUserId = getFromSessionStorage('userId');

    const [file, setFile] = useState(null);
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const yupUserSchema = object({
        firstName: string()
            .required('Cannot be empty')
            .max(255, 'Must be 255 characters or less'),
        lastName: string()
            .required('Cannot be empty')
            .max(255, 'Must be 255 characters or less'),
        email: string().required('Cannot be empty').email('Invalid email'),
        dob: date(),
    });

    const formik = useFormik({
        initialValues: {
            firstName,
            lastName,
            email,
            dob,
        },
        validationSchema: yupUserSchema,
        onSubmit: async (values) => {
            if (file) {
                const uploadedFile = await uploadAvatarOnCloudinary(file);

                const payload = {
                    avatar: uploadedFile.avatar,
                    ...values,
                };

                await handleProfileUpdate(loggedInUserId, payload);
            } else {
                await handleProfileUpdate(loggedInUserId, values);
            }

            await getMe();
        },
    });

    return (
        <Row className="justify-content-center">
            <Col lg={3}>
                <Form
                    encType="multipart/form-data"
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <h4 className="text-center fw-bold">
                        Update your profile details
                    </h4>
                    <Form.Group className="d-flex flex-column gap-1">
                        <label htmlFor="update-avatar">Profile image</label>
                        <Form.Control
                            type="file"
                            name="avatar"
                            onChange={handleFile}
                            className="rounded-0 py-2"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column gap-1">
                        <label htmlFor="update-first-name">First Name</label>
                        <InputText
                            name="firstName"
                            id="update-first-name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <ErrorMessage error={formik.errors.firstName} />
                        ) : null}
                    </Form.Group>
                    <Form.Group className="d-flex flex-column gap-1">
                        <label htmlFor="update-last-name">Last Name</label>
                        <InputText
                            name="lastName"
                            id="update-last-name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <ErrorMessage error={formik.errors.lastName} />
                        ) : null}
                    </Form.Group>
                    <Form.Group className="d-flex flex-column gap-1">
                        <label htmlFor="update-email">Email</label>
                        <InputText
                            name="email"
                            id="update-email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column gap-1">
                        <label htmlFor="update-dob" className="d-flex">
                            Date of birth
                        </label>
                        <Calendar
                            name="dob"
                            id="update-dob"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                        />
                    </Form.Group>
                    {isLoading ? (
                        <CascadeSelect
                            loading
                            placeholder="Updating your details..."
                            className="custom-btn loading-btn w-100"
                        />
                    ) : (
                        <Button
                            type="submit"
                            label="Update"
                            className="custom-btn w-100"
                        />
                    )}
                </Form>
            </Col>
        </Row>
    );
};

export default UpdateProfile;
