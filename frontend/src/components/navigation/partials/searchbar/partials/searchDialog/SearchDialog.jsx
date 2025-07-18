import './searchDialog.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Form, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Photographers from './partials/Photographers.jsx';
import { UserContext } from '../../../../../../contexts/UserContext.jsx';
import CustomMessage from '../../../../../customMessage/CustomMessage.jsx';

const SearchDialog = ({ handleHide }) => {
    const { error, isLoading, getAllPhotographers, photographers } =
        useContext(UserContext);

    const [fullName, setFullName] = useState({
        first: '',
        last: '',
    });

    const handleName = (e) => {
        const { name, value } = e.target;

        setFullName({
            ...fullName,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getAllPhotographers(fullName.first, fullName.last);
    };

    useEffect(() => {
        getAllPhotographers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                className="search-bar-form p-inputgroup flex-1"
            >
                <Button
                    type="submit"
                    icon="pi pi-search"
                    className="custom-btn px-4 rounded-end-0 shadow-none"
                />
                <div className="d-flex flex-column flex-md-row w-100">
                    <InputText
                        autoFocus={true}
                        name="first"
                        value={fullName.first}
                        onChange={handleName}
                        placeholder="First Name (optional)"
                        className="custom-input w-100 rounded-0 shadow-none"
                    />
                    <InputText
                        autoFocus={true}
                        name="last"
                        value={fullName.last}
                        onChange={handleName}
                        placeholder="Last Name (optional)"
                        className="custom-input w-100 rounded-0 shadow-none"
                    />
                </div>
                <Button
                    type="button"
                    icon="pi pi-times"
                    onClick={handleHide}
                    className="custom-btn px-4 rounded-start-0 shadow-none"
                />
            </Form>
            <div>
                <ListGroup className="border rounded-0">
                    {isLoading && <p>loading...</p>}
                    {!isLoading && error && <CustomMessage error={error} />}
                    {!isLoading &&
                        !error &&
                        photographers &&
                        photographers.map((photographer) => {
                            const { _id: photographerId } = photographer;

                            return (
                                <Photographers
                                    key={photographerId}
                                    photographer={photographer}
                                />
                            );
                        })}
                </ListGroup>
            </div>
        </>
    );
};

export default SearchDialog;
