import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { UserContext } from '../../../../../contexts/UserContext.jsx';
import { PhotoContext } from '../../../../../contexts/PhotoContext.jsx';

const SearchPhoto = () => {
    const { user } = useContext(UserContext);
    const userId = user && user._id;

    const { getPhotographerPhotos } = useContext(PhotoContext);

    const [photoQuery, setPhotoQuery] = useState('');
    const handlePhotoQuery = (e) => {
        setPhotoQuery(e.target.value);
    };

    const isQuery = photoQuery !== '';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isQuery) getPhotographerPhotos(userId, photoQuery);
    };

    const resetPhotoSearch = () => {
        getPhotographerPhotos(userId);
    };

    return (
        <Form onSubmit={handleSubmit} className="d-flex">
            <div className="p-inputgroup">
                <Button
                    type="submit"
                    icon="pi pi-search"
                    className="custom-btn py-2 rounded-end-0"
                />
                <InputText
                    type="text"
                    name="photoQuery"
                    value={photoQuery}
                    onChange={handlePhotoQuery}
                    placeholder="Search by tag"
                    className="search-photo-input custom-input py-2"
                />
                <Button
                    type="button"
                    icon="pi pi-refresh"
                    onClick={resetPhotoSearch}
                    className="custom-btn p-y2 rounded-start-0"
                />
            </div>
        </Form>
    );
};

export default SearchPhoto;
