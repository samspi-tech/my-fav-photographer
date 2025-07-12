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
                <Button icon="pi pi-search" className="custom-btn py-2" />
                <InputText
                    type="text"
                    className="py-2"
                    name="photoQuery"
                    value={photoQuery}
                    onChange={handlePhotoQuery}
                    placeholder="Search by tag"
                />
                <Button
                    icon="pi pi-refresh"
                    onClick={resetPhotoSearch}
                    className="custom-btn p-y2"
                />
            </div>
        </Form>
    );
};

export default SearchPhoto;
