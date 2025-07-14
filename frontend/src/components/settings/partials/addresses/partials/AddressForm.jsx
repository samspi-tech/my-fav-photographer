import { useContext } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { object, string, number } from 'yup';
import { InputText } from 'primereact/inputtext';
import ErrorMessage from '../../../../errorMessage/ErrorMessage.jsx';
import { AddressContext } from '../../../../../contexts/AddressContext.jsx';
import { getFromSessionStorage } from '../../../../../utils/sessionStorage.js';
import { InputNumber } from 'primereact/inputnumber';

const AddressForm = ({ initialValues, addressId, submitFn }) => {
    const { getAddresses, createAddress, updateAddress } =
        useContext(AddressContext);

    const loggedInUserId = getFromSessionStorage('userId');

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
            .positive()
            .integer()
            .test(
                'maxDigits',
                'Must be 255 characters or less',
                (number) => String(number).length <= 255,
            ),
        contact: number()
            .required('Required')
            .positive()
            .integer()
            .test(
                'minDigits',
                'Invalid Phone number',
                (number) => String(number).length >= 10,
            )
            .test(
                'maxDigits',
                'Must be 255 characters or less',
                (number) => String(number).length <= 255,
            ),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: yupAddressSchema,
        onSubmit: async (values) => {
            submitFn === 'create'
                ? await createAddress(loggedInUserId, values)
                : await updateAddress(loggedInUserId, addressId, values);

            await getAddresses(loggedInUserId);
        },
    });

    console.log(formik.values.cap);
    console.log(formik.values.contact);

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
                <InputNumber
                    id="cap"
                    name="cap"
                    useGrouping={false}
                    value={formik.values.cap}
                    onValueChange={formik.handleChange}
                />
                {formik.touched.cap && formik.errors.cap ? (
                    <ErrorMessage error={formik.errors.cap} />
                ) : null}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
                <label htmlFor="contact">Phone Number</label>
                <InputNumber
                    id="contact"
                    name="contact"
                    useGrouping={false}
                    value={formik.values.contact}
                    onValueChange={formik.handleChange}
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
