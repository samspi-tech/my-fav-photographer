import './searchDialog.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Form, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Photographers from './partials/Photographers.jsx';
import { UserContext } from '../../../../../../contexts/UserContext.jsx';
import CustomMessage from '../../../../../customMessage/CustomMessage.jsx';
import CustomPagination from '../../../../../customPagination/CustomPagination.jsx';

const SearchDialog = ({ handleHide }) => {
    const {
        page,
        error,
        setPage,
        isLoading,
        totalPages,
        photographers,
        getAllPhotographers,
    } = useContext(UserContext);

    const [fullName, setFullName] = useState('');

    const handleFullName = (e) => {
        setFullName(e.target.value);
    };

    const isQueryPhotographer = fullName !== '';

    const handleSearchReset = () => {
        setFullName('');
        getAllPhotographers();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        isQueryPhotographer && getAllPhotographers(fullName);
    };

    useEffect(() => {
        getAllPhotographers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

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
                        onFocus={() => setPage(1)}
                        value={fullName.trimStart()}
                        placeholder="Search photographer"
                        className="custom-input w-100 rounded-0 shadow-none"
                    />
                </div>
                <Button
                    type="button"
                    icon="pi pi-refresh"
                    onClick={handleSearchReset}
                    className="custom-btn px-4 rounded-0 border-danger border-0 border-end shadow-none"
                />
                <Button
                    type="button"
                    icon="pi pi-times"
                    onClick={handleHide}
                    className="custom-btn px-4 rounded-start-0 shadow-none"
                />
            </Form>
            <ListGroup className="border rounded-0">
                {isLoading && (
                    <CustomMessage
                        loading={true}
                        error="Loading photographers..."
                    />
                )}
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
            {totalPages > 1 && (
                <div className="photographers-pagination-container border rounded-bottom">
                    <CustomPagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </>
    );
};

export default SearchDialog;
