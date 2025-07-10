import { Container } from 'react-bootstrap';
import { Galleria } from 'primereact/galleria';
import { useEffect, useRef, useState } from 'react';
import { usePhotos } from '../../../hooks/usePhotos.js';
import CustomMessage from '../../customMessage/CustomMessage.jsx';

const ProfilePhotos = ({ userId }) => {
    const { error, isLoading, getPhotographerPhotos, photos } = usePhotos();

    const [activeIndex, setActiveIndex] = useState(0);
    const galleria = useRef(null);

    useEffect(() => {
        getPhotographerPhotos(userId);
    }, []);

    const itemTemplate = (item) => {
        return (
            <img
                src={item.photo}
                alt={item.photo}
                className="profile-gallery-item"
            />
        );
    };

    const thumbnailTemplate = (item) => {
        return (
            <img
                src={item.photo}
                alt={item.photo}
                className="profile-gallery-thumbnail"
            />
        );
    };

    return (
        <Container>
            {isLoading && <CustomMessage error="Loading..." />}
            {!isLoading && error && <CustomMessage error={error} />}
            <div className="d-flex justify-content-center align-items-center mb-5 py-5">
                <Galleria
                    ref={galleria}
                    value={photos}
                    numVisible={7}
                    activeIndex={activeIndex}
                    onItemChange={(e) => setActiveIndex(e.index)}
                    circular
                    fullScreen
                    showItemNavigators
                    showThumbnails={false}
                    item={itemTemplate}
                    thumbnail={thumbnailTemplate}
                />
                <div className="profile-gallery-grid">
                    {photos &&
                        photos.map((photo, index) => {
                            let photoEl = (
                                <img
                                    src={photo.photo}
                                    alt={photo.photo}
                                    className="profile-gallery-photo"
                                    onClick={() => {
                                        setActiveIndex(index);
                                        galleria.current.show();
                                    }}
                                />
                            );
                            return <div key={index}>{photoEl}</div>;
                        })}
                </div>
            </div>
        </Container>
    );
};

export default ProfilePhotos;
