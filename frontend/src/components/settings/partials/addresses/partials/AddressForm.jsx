import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { object, string, number } from 'yup';
import { InputText } from 'primereact/inputtext';
import ErrorMessage from '../../../../errorMessage/ErrorMessage.jsx';

const AddressForm = ({ initialValues, submitFn }) => {
    const yupAddressSchema = object({
        street: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        city: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        province: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        cap: number()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        contact: number()
            .required('Required')
            .min(10, 'Must be a valid phone number')
            .max(255, 'Must be 255 characters or less')
    });

    const formik = useFormik({
        initialValues,
        validationSchema: yupAddressSchema,
        onSubmit: async (values) => {
            submitFn();
            console.log(values);
        }
    });

    return (
        <Form
            className="d-flex flex-column gap-2"
            onSubmit={formik.handleSubmit}
        >
            <Form.Group className="d-flex flex-column gap-1">
                <label htmlFor="street">Street</label>
                <InputText
                    id="street"
                    name="street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                />
                {formik.touched.street && formik.errors.street ? (
                    <ErrorMessage error={formik.errors.street} />
                ) : null}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
                <label htmlFor="city">City</label>
                <InputText
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                />
                {formik.touched.city && formik.errors.city ? (
                    <ErrorMessage error={formik.errors.city} />
                ) : null}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
                <label htmlFor="province">Province</label>
                <InputText
                    id="province"
                    name="province"
                    value={formik.values.province}
                    onChange={formik.handleChange}
                />
                {formik.touched.province && formik.errors.province ? (
                    <ErrorMessage error={formik.errors.province} />
                ) : null}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
                <label htmlFor="cap">CAP</label>
                <InputText
                    id="cap"
                    name="cap"
                    value={formik.values.cap}
                    onChange={formik.handleChange}
                />
                {formik.touched.cap && formik.errors.cap ? (
                    <ErrorMessage error={formik.errors.cap} />
                ) : null}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
                <label htmlFor="contact">Phone Number</label>
                <InputText
                    id="contact"
                    name="contact"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                />
                {formik.touched.contact && formik.errors.contact ? (
                    <ErrorMessage error={formik.errors.contact} />
                ) : null}
            </Form.Group>
            <Button type="submit" label="Add" className="custom-btn mt-2" />
        </Form>
    );
};

export default AddressForm;
