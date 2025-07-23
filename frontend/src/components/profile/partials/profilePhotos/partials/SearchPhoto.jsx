import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { UserContext } from '../../../../../contexts/UserContext.jsx';
import { PhotoContext } from '../../../../../contexts/PhotoContext.jsx';

const SearchPhoto = () => {
    const { photographerId } = useParams();

    const { user } = useContext(UserContext);
    const userId = user && user._id;

    const { getPhotographerPhotos } = useContext(PhotoContext);

    const [photoQuery, setPhotoQuery] = useState('');

    const handlePhotoQuery = (e) => {
        setPhotoQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        photographerId
            ? getPhotographerPhotos(photographerId, photoQuery)
            : getPhotographerPhotos(userId, photoQuery);
    };

    const resetPhotoSearch = () => {
        photographerId
            ? getPhotographerPhotos(photographerId)
            : getPhotographerPhotos(userId);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="d-flex mx-auto mx-md-0 ms-md-auto"
        >
            <div className="p-inputgroup">
                <InputText
                    type="text"
                    name="photoQuery"
                    onChange={handlePhotoQuery}
                    placeholder="Search by tag"
                    value={photoQuery.trimStart()}
                    className="search-photo-input custom-input py-2"
                />
                <Button
                    type="button"
                    icon="pi pi-refresh"
                    onClick={resetPhotoSearch}
                    className="custom-btn p-y2 rounded-0 border-danger border-0 border-end"
                />
                <Button
                    type="submit"
                    icon="pi pi-search"
                    className="custom-btn py-2 rounded-start-0"
                />
            </div>
        </Form>
    );
};

export default SearchPhoto;
