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
    const { getPhotographerPhotos } = useContext(PhotoContext);

    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    const loggedInUserId = getFromSessionStorage('userId');

    const [files, setFiles] = useState(null);
    const { handlePhotosUpload } = usePhotosUpload(files);

    const yupPhotoSchema = object({
        body: string().max(2550, 'Must be 2550 characters or less').trim(),
        tag: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less')
            .trim(),
    });

    const formik = useFormik({
        initialValues: {
            tag: '',
            body: '',
        },
        validationSchema: yupPhotoSchema,
        onSubmit: async (values) => {
            await handlePhotosUpload(loggedInUserId, values);
        },
    });

    return (
        <>
            <Button
                size="small"
                label="Upload"
                icon="pi pi-image"
                onClick={handleIsVisible}
                className="custom-btn align-self-end"
            />
            <Dialog
                visible={isVisible}
                onHide={async () => {
                    handleIsVisible();
                    await getPhotographerPhotos(loggedInUserId);
                }}
                header="Upload your photos"
                className="dialog-photo-upload custom-dialog"
            >
                <>
                    <Form.Group className="d-flex flex-column mt-3 gap-1">
                        <label
                            id="photo-tag"
                            className="d-flex align-items-center gap-1"
                        >
                            <span className="pi pi-tags"></span> Tags:
                            <small className="fst-italic">
                                (Please provide tags before choosing your
                                photos)
                            </small>
                        </label>
                        <InputText
                            name="tag"
                            type="text"
                            id="photo-tag"
                            value={formik.values.tag}
                            onChange={formik.handleChange}
                            className="custom-input shadow-none py-1 rounded"
                        />
                        {formik.touched.tag && formik.errors.tag ? (
                            <ErrorMessage error={formik.errors.tag} />
                        ) : null}
                    </Form.Group>
                    <Form.Group className="d-flex flex-column my-3 gap-1">
                        <label
                            id="photo-description"
                            className="d-flex align-items-center gap-1"
                        >
                            Description:{' '}
                            <span className="small fst-italic">(optional)</span>
                        </label>
                        <InputTextarea
                            type="text"
                            name="body"
                            id="photo-description"
                            value={formik.values.body}
                            onChange={formik.handleChange}
                            className="custom-input shadow-none py-1 rounded"
                        />
                        {formik.touched.body && formik.errors.body ? (
                            <ErrorMessage error={formik.errors.body} />
                        ) : null}
                    </Form.Group>
                    <div className="card custom-card">
                        <FileUpload
                            multiple
                            name="photos"
                            withCredentials
                            accept="image/*"
                            maxFileSize={50000000}
                            className="custom-file-upload"
                            onUpload={formik.handleSubmit}
                            disabled={formik.values.tag.trim() === ''}
                            onSelect={(e) => setFiles([...e.files])}
                            url={`${import.meta.env.VITE_SERVER_BASE_URL}/photo/cloud-upload/photos`}
                            emptyTemplate={
                                <p className="mb-0">
                                    Drag and drop files to here to upload.
                                </p>
                            }
                        />
                    </div>
                </>
            </Dialog>
        </>
    );
};

export default UploadPhoto;
