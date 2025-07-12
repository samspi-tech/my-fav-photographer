import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ErrorMessage from '../../../../errorMessage/ErrorMessage.jsx';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { PhotoContext } from '../../../../../contexts/PhotoContext.jsx';

const PhotoDescriptionForm = ({ photo }) => {
    const { tag, body, user: userId, _id: photoId } = photo;

    const { updatePhoto, getPhotographerPhotos } = useContext(PhotoContext);

    const yupPhotoSchema = object({
        body: string().max(2550, 'Must be 2550 characters or less'),
        tag: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
    });

    const formik = useFormik({
        initialValues: {
            tag,
            body,
        },
        validationSchema: yupPhotoSchema,
        onSubmit: async (values) => {
            await updatePhoto(userId, photoId, values);
            await getPhotographerPhotos(userId);
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className="form-edit-photo">
            <Form.Group className="d-flex flex-column mt-3 gap-1">
                <label
                    id="photo-tag"
                    className="d-flex align-items-center gap-1"
                >
                    <span className="pi pi-tags"></span> Tags:
                </label>
                <InputText
                    name="tag"
                    type="text"
                    id="photo-tag"
                    value={formik.values.tag}
                    onChange={formik.handleChange}
                    className="photo-tags-input shadow-none py-1 rounded"
                />
                {formik.touched.tag && formik.errors.tag ? (
                    <ErrorMessage error={formik.errors.tag} />
                ) : null}
            </Form.Group>
            <Form.Group className="d-flex flex-column mt-3 gap-1">
                <label
                    id="photo-description"
                    className="d-flex align-items-center gap-1"
                >
                    Description: <span className="small">(optional)</span>
                </label>
                <InputTextarea
                    type="text"
                    name="body"
                    id="photo-description"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    className="photo-tags-input shadow-none py-1 rounded"
                />
                {formik.touched.body && formik.errors.body ? (
                    <ErrorMessage error={formik.errors.body} />
                ) : null}
            </Form.Group>
            <Button
                label="Post"
                type="submit"
                className="custom-btn mt-3 w-100"
            />
        </Form>
    );
};

export default PhotoDescriptionForm;
