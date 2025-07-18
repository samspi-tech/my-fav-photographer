import { useContext } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import ErrorMessage from '../../errorMessage/ErrorMessage.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';
import { CommentContext } from '../../../contexts/CommentContext.jsx';

const CommentForm = ({ initialValues, submitFn, postId, commentId }) => {
    const { user } = useContext(UserContext);
    const { isLoading, createComment, updateComment, getPostComments } =
        useContext(CommentContext);

    const yupCommentSchema = object({
        comment: string()
            .required('Required')
            .max(2550, 'Must be 2550 characters or less'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: yupCommentSchema,
        onSubmit: async (values) => {
            const userId = user && user._id;

            submitFn === 'create'
                ? await createComment(userId, postId, values)
                : await updateComment(postId, commentId, values);

            await getPostComments(postId);

            formik.resetForm();
        },
    });

    return (
        <Form
            onSubmit={formik.handleSubmit}
            className="d-flex bg-white rounded mt-3"
        >
            <Form.Group className="w-100 custom-input rounded-start border-end-0">
                <InputTextarea
                    rows={1}
                    autoFocus
                    type="text"
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    placeholder="Add a comment..."
                    className="custom-input w-100 border-0 shadow-none"
                />
                {formik.touched.comment && formik.errors.comment ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.comment} />
                    </div>
                ) : null}
            </Form.Group>
            {isLoading ? (
                <ProgressSpinner
                    strokeWidth="5"
                    className="comment-loading-spinner my-auto me-3"
                />
            ) : (
                <Button
                    link
                    disabled={formik.values.comment.trim() === ''}
                    label="Post"
                    size="small"
                    type="submit"
                    className="ms-auto custom-btn rounded-start-0 shadow-none"
                />
            )}
        </Form>
    );
};

export default CommentForm;
