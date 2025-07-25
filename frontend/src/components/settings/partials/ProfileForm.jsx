import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { object, string, date } from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Col, Form, Row } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { useContext, useRef, useState } from 'react';
import ErrorMessage from '../../errorMessage/ErrorMessage.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';
import LoadingButton from '../../loadingButton/LoadingButton.jsx';
import { useAvatarUpload } from '../../../hooks/useAvatarUpload.js';
import { getFromSessionStorage } from '../../../utils/sessionStorage.js';

const ProfileForm = ({ user }) => {
    const toast = useRef(null);

    const { getMe } = useContext(UserContext);
    const { firstName, lastName, email, dob } = user;

    const { error, isLoading, uploadAvatarOnCloudinary, handleProfileUpdate } =
        useAvatarUpload();

    const loggedInUserId = getFromSessionStorage('userId');

    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const yupUserSchema = object({
        firstName: string()
            .required('Cannot be empty')
            .max(255, 'Must be 255 characters or less')
            .trim(),
        lastName: string()
            .required('Cannot be empty')
            .max(255, 'Must be 255 characters or less')
            .trim(),
        email: string()
            .required('Cannot be empty')
            .email('Invalid email')
            .trim(),
        dob: date().max(new Date(), 'Cannot jump to the future'),
    });

    const formik = useFormik({
        initialValues: {
            firstName,
            lastName,
            email,
            dob: new Date(dob),
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

            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Details updated successfully',
                life: 3000,
            });
        },
    });

    return (
        <Row className="justify-content-center">
            <Col md={6} xl={4}>
                <Toast ref={toast} position="top-center" />
                <Form
                    encType="multipart/form-data"
                    onSubmit={formik.handleSubmit}
                    className="settings-profile-form d-flex flex-column gap-3"
                >
                    <h1 className="settings-profile-form-title text-center mb-0">
                        Update your profile
                    </h1>
                    <Form.Group className="d-flex flex-column gap-1">
                        <label
                            htmlFor="update-avatar"
                            className="custom-input file-input rounded"
                        >
                            {file ? (
                                <>
                                    <span>Photo:</span> {file.name}
                                </>
                            ) : (
                                'Click here to upload your profile image'
                            )}
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            id="update-avatar"
                            onChange={handleFile}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column gap-1">
                        <label htmlFor="update-first-name">First Name</label>
                        <InputText
                            name="firstName"
                            id="update-first-name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            className="custom-input"
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
                            className="custom-input"
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
                            className="custom-input"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <ErrorMessage error={formik.errors.email} />
                        ) : null}
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
                            placeholder={new Date(formik.values.dob)}
                            className="custom-input custom-calendar-input rounded"
                        />
                        {formik.touched.dob && formik.errors.dob ? (
                            <ErrorMessage error={formik.errors.dob} />
                        ) : null}
                    </Form.Group>
                    {isLoading ? (
                        <LoadingButton />
                    ) : (
                        <Button
                            type="submit"
                            label="Update"
                            className="custom-btn w-100"
                        />
                    )}
                </Form>
                {error && (
                    <div className="d-flex justify-content-center mt-3">
                        <ErrorMessage error={error} />
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default ProfileForm;
