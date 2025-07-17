import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Form } from 'react-bootstrap';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import ErrorMessage from '../../../../errorMessage/ErrorMessage.jsx';
import { PhotoContext } from '../../../../../contexts/PhotoContext.jsx';
import { usePhotosUpload } from '../../../../../hooks/usePhotosUpload.js';
import { getFromSessionStorage } from '../../../../../utils/sessionStorage.js';

const UploadPhoto = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    const loggedInUserId = getFromSessionStorage('userId');

    const { getPhotographerPhotos } = useContext(PhotoContext);

    const [files, setFiles] = useState(null);

    const { handlePhotosUpload } = usePhotosUpload(
        files,
        getPhotographerPhotos,
    );

    const yupPhotoSchema = object({
        body: string().max(2550, 'Must be 2550 characters or less'),
        tag: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
    });

    const formik = useFormik({
        initialValues: {
            tag: '',
            body: '',
        },
        validationSchema: yupPhotoSchema,
        onSubmit: async (values) => {
            await handlePhotosUpload(loggedInUserId, values);
            await getPhotographerPhotos(loggedInUserId);
        },
    });

    return (
        <>
            <Button
                size="small"
                icon="pi pi-image"
                onClick={handleIsVisible}
                label="Upload"
                className="custom-btn align-self-end"
            />
            <Dialog
                visible={isVisible}
                onHide={handleIsVisible}
                header="Upload your photos"
                className="dialog-photo-upload"
            >
                <div className="card">
                    <div className="card">
                        <FileUpload
                            multiple
                            name="photos"
                            withCredentials
                            accept="image/*"
                            maxFileSize={50000000}
                            className="custom-file-upload"
                            onUpload={formik.handleSubmit}
                            onSelect={(e) => setFiles([...e.files])}
                            url={`${import.meta.env.VITE_SERVER_BASE_URL}/photo/cloud-upload/photos`}
                            emptyTemplate={
                                <p className="mb-0">
                                    Drag and drop files to here to upload.
                                </p>
                            }
                        />
                    </div>
                </div>
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
            </Dialog>
        </>
    );
};

export default UploadPhoto;
