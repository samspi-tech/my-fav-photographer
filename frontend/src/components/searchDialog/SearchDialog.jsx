import './searchDialog.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Form, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Photographers from './partials/Photographers.jsx';
import { UserContext } from '../../contexts/UserContext.jsx';
import CustomMessage from '../customMessage/CustomMessage.jsx';

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
    }, []);

    return (
        <>
            <Form onSubmit={handleSubmit} className="p-inputgroup flex-1">
                <Button
                    type="submit"
                    icon="pi pi-search"
                    className="search-btn px-4 shadow-none"
                />
                <div className="d-flex flex-column flex-md-row w-100">
                    <InputText
                        autoFocus={true}
                        name="first"
                        value={fullName.first}
                        onChange={handleName}
                        placeholder="First Name (optional)"
                        className="w-100 border shadow-none border-bottom-0"
                    />
                    <InputText
                        autoFocus={true}
                        name="last"
                        value={fullName.last}
                        onChange={handleName}
                        placeholder="Last Name (optional)"
                        className="w-100 border shadow-none border-bottom-0"
                    />
                </div>
                <Button
                    type="button"
                    icon="pi pi-times"
                    onClick={handleHide}
                    className="close-btn px-4 shadow-none"
                />
            </Form>
            <div>
                <ListGroup className="rounded-top-0">
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
