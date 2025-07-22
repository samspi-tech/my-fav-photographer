import { useFormik } from 'formik';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { object, string, date } from 'yup';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ErrorMessage from '../../../../errorMessage/ErrorMessage.jsx';
import { WorkshopContext } from '../../../../../contexts/WorkshopContext.jsx';
import LoadingButton from '../../../../loadingButton/LoadingButton.jsx';

const WorkshopForm = ({
    userId,
    submitFn,
    workshopId,
    initialValues,
    handleVisibility,
}) => {
    const { isLoading, createWorkshop, updateWorkshop, getWorkshops } =
        useContext(WorkshopContext);

    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 7);

    const yupWorkshopSchema = object({
        title: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less')
            .trim(),
        body: string()
            .required('Required')
            .max(2550, 'Must be 2550 characters or less')
            .trim(),
        date: date()
            .min(todayDate, 'Minimum 7 days from today.')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: yupWorkshopSchema,
        onSubmit: async (values) => {
            submitFn === 'create'
                ? await createWorkshop(userId, values)
                : await updateWorkshop(userId, workshopId, values);

            await getWorkshops(userId);
            handleVisibility();
        },
    });

    return (
        <Form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-3"
        >
            <Form.Group>
                <label id="workshop-title">Title</label>
                <InputText
                    type="text"
                    name="title"
                    id="workshop-title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Title of your workshop"
                    className="custom-input w-100 shadow-none mt-1"
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.title} />
                    </div>
                ) : null}
            </Form.Group>
            <Form.Group>
                <label id="workshop-body">Description</label>
                <InputTextarea
                    autoResize
                    type="text"
                    name="body"
                    id="workshop-body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    placeholder="Workshop description"
                    className="custom-input w-100 shadow-none mt-1"
                />
                {formik.touched.body && formik.errors.body ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.body} />
                    </div>
                ) : null}
            </Form.Group>
            <Form.Group>
                <label id="workshop-date">When is happening?</label>
                <Calendar
                    showTime
                    type="date"
                    name="date"
                    hourFormat="24"
                    id="workshop-date"
                    value={formik.values.date}
                    placeholder={
                        formik.values.date
                            ? new Date(formik.values.date)
                            : new Date()
                    }
                    onChange={formik.handleChange}
                    className="custom-input custom-calendar-input w-100 rounded mt-1"
                />
                {formik.touched.date && formik.errors.date ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.date} />
                    </div>
                ) : null}
            </Form.Group>
            {isLoading ? (
                <LoadingButton />
            ) : (
                <Button
                    type="submit"
                    className="custom-btn mt-2"
                    label="Post"
                />
            )}
        </Form>
    );
};

export default WorkshopForm;
