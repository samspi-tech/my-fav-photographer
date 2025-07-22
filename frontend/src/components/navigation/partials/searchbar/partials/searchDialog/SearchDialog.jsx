import './searchDialog.css';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Form, ListGroup } from 'react-bootstrap';
import Photographers from './partials/Photographers.jsx';
import { UserContext } from '../../../../../../contexts/UserContext.jsx';
import CustomMessage from '../../../../../customMessage/CustomMessage.jsx';

const SearchDialog = ({ handleHide }) => {
    const { error, isLoading, getAllPhotographers, photographers } =
        useContext(UserContext);

    const [fullName, setFullName] = useState('');

    const handleFullName = (e) => {
        setFullName(e.target.value);
    };

    const isQueryPhotographer = fullName !== '';

    const handleSubmit = (e) => {
        e.preventDefault();

        isQueryPhotographer && getAllPhotographers(fullName);
    };

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
                        name="first"
                        autoFocus={true}
                        onChange={handleFullName}
                        value={fullName.trimStart()}
                        placeholder="Search photographer"
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
            {isQueryPhotographer && (
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
                                    handleSearchbarVisibility={handleHide}
                                />
                            );
                        })}
                </ListGroup>
            )}
        </>
    );
};

export default SearchDialog;
