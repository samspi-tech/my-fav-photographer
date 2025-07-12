import { useContext } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ErrorMessage from '../../../../errorMessage/ErrorMessage.jsx';
import { EquipmentContext } from '../../../../../contexts/EquipmentContext.jsx';

const EquipmentForm = ({ equipmentId, userId, initialValues, submitFn }) => {
    const { createEquipment, updateEquipment, getEquipment } =
        useContext(EquipmentContext);

    const yupEquipmentSchema = object({
        camera: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        lens: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        bag: string()
            .required('Required')
            .max(255, 'Must be 255 characters or less'),
        tripod: string().max(255, 'Must be 255 characters or less'),
        other: string().max(255, 'Must be 255 characters or less'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: yupEquipmentSchema,
        onSubmit: async (values) => {
            submitFn === 'create'
                ? await createEquipment(userId, values)
                : await updateEquipment(userId, equipmentId, values);

            await getEquipment(userId);
        },
    });

    return (
        <Form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-3"
        >
            <Form.Group>
                <label id="camera">Camera</label>
                <InputText
                    id="camera"
                    type="text"
                    name="camera"
                    value={formik.values.camera}
                    onChange={formik.handleChange}
                    placeholder="Camera"
                    className="w-100 bg-dark-subtle shadow-none"
                />
                {formik.touched.camera && formik.errors.camera ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.camera} />
                    </div>
                ) : null}
            </Form.Group>
            <Form.Group>
                <label id="lens">Lens</label>
                <InputText
                    id="lens"
                    type="text"
                    name="lens"
                    value={formik.values.lens}
                    onChange={formik.handleChange}
                    placeholder="Lens"
                    className="w-100 bg-dark-subtle shadow-none"
                />
                {formik.touched.lens && formik.errors.lens ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.lens} />
                    </div>
                ) : null}
            </Form.Group>
            <Form.Group>
                <label id="bag">Bag</label>
                <InputText
                    id="bag"
                    type="text"
                    name="bag"
                    value={formik.values.bag}
                    onChange={formik.handleChange}
                    placeholder="Bag"
                    className="w-100 bg-dark-subtle shadow-none"
                />
                {formik.touched.bag && formik.errors.bag ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.bag} />
                    </div>
                ) : null}
            </Form.Group>
            <Form.Group>
                <label id="tripod">
                    Tripod <span className="small">(optional)</span>
                </label>
                <InputText
                    id="tripod"
                    type="text"
                    name="tripod"
                    value={formik.values.tripod}
                    onChange={formik.handleChange}
                    placeholder="Tripod"
                    className="w-100 bg-dark-subtle shadow-none"
                />
                {formik.touched.tripod && formik.errors.tripod ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.tripod} />
                    </div>
                ) : null}
            </Form.Group>
            <Form.Group>
                <label id="other">
                    Other <span className="small">(optional)</span>
                </label>
                <InputText
                    id="other"
                    type="text"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange}
                    placeholder="Other"
                    className="w-100 bg-dark-subtle shadow-none"
                />
                {formik.touched.other && formik.errors.other ? (
                    <div className="ms-2 mb-2">
                        <ErrorMessage error={formik.errors.other} />
                    </div>
                ) : null}
            </Form.Group>
            <Button type="submit" label="Post" className="custom-btn w-100" />
        </Form>
    );
};

export default EquipmentForm;
