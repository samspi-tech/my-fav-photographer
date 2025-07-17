import { useContext } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { CascadeSelect } from 'primereact/cascadeselect';
import { InputTextarea } from 'primereact/inputtextarea';
import ErrorMessage from '../errorMessage/ErrorMessage.jsx';
import { PostContext } from '../../contexts/PostContext.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';

const PostForm = ({ initialValues, submitFn, postId }) => {
    const { isLoading, createPost, updatePost, getPhotographerPosts } =
        useContext(PostContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const yupPostSchema = object({
        title: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        body: string()
            .required('Required')
            .max(2550, 'Must be 2550 characters or less'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: yupPostSchema,
        onSubmit: async (values) => {
            submitFn === 'create'
                ? await createPost(loggedInUserId, values)
                : await updatePost(loggedInUserId, postId, values);

            await getPhotographerPosts(loggedInUserId);
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <InputText
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className="custom-input w-100 shadow-none border"
                />
                {formik.touched.title && formik.errors.title ? (
                    <ErrorMessage error={formik.errors.title} />
                ) : null}
            </Form.Group>
            <Form.Group>
                <InputTextarea
                    autoResize
                    type="text"
                    name="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    placeholder="Share your story..."
                    className="custom-input w-100 shadow-none border mt-3"
                />
                {formik.touched.body && formik.errors.body ? (
                    <ErrorMessage error={formik.errors.body} />
                ) : null}
            </Form.Group>
            {isLoading ? (
                <CascadeSelect
                    loading
                    placeholder="Posting..."
                    className="custom-btn loading-btn w-100"
                />
            ) : (
                <Button
                    type="submit"
                    label="Post"
                    className="custom-btn w-100 mt-3"
                />
            )}
        </Form>
    );
};

export default PostForm;
