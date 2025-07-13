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

const WorkshopForm = ({ initialValues, submitFn, userId, workshopId }) => {
    const { createWorkshop, updateWorkshop, getWorkshops } =
        useContext(WorkshopContext);

    const yupWorkshopSchema = object({
        title: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        body: string()
            .required('Required')
            .max(2550, 'Must be 2550 characters or less'),
        date: date().required('Required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: yupWorkshopSchema,
        onSubmit: async (values) => {
            submitFn === 'create'
                ? await createWorkshop(userId, values)
                : await updateWorkshop(userId, workshopId, values);

            await getWorkshops(userId);
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
                    className="w-100 border shadow-none"
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
                    className="w-100 shadow-none border"
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
                    onChange={formik.handleChange}
                    className="w-100 custom-calendar-input border"
                />
                {formik.touched.date && formik.errors.date ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.date} />
                    </div>
                ) : null}
            </Form.Group>
            <Button type="submit" className="custom-btn" label="Post" />
        </Form>
    );
};

export default WorkshopForm;
