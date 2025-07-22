import { Galleria } from 'primereact/galleria';
import SinglePhoto from './partials/SinglePhoto.jsx';
import UploadPhoto from './partials/UploadPhoto.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import SearchPhoto from './partials/SearchPhoto.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { PhotoContext } from '../../../../contexts/PhotoContext.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';
import CustomPagination from '../../../customPagination/CustomPagination.jsx';

const ProfilePhotos = ({ user }) => {
    const { _id: userId } = user;

    const loggedInUserRole = getFromSessionStorage('role');
    const isActionAllowed = loggedInUserRole === 'photographer';

    const [isVisible, setIsVisible] = useState(true);

    const handleCaptionVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const {
        error,
        isLoading,
        getPhotographerPhotos,
        photos,
        page,
        setPage,
        totalPages,
    } = useContext(PhotoContext);

    useEffect(() => {
        getPhotographerPhotos(userId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, userId]);

    const galleria = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

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

    const caption = (item) => {
        return (
            <div>
                <p className="mb-2">{item.body}</p>
                <p className="d-flex align-items-center gap-1 small">
                    <span className="pi pi-tags"></span>
                    {item.tag}
                </p>
            </div>
        );
    };

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10} xl={6}>
                        {!isLoading && (
                            <div className="d-flex flex-column gap-5 my-3">
                                <div className="d-flex flex-column flex-md-row gap-5 gap-md-0 justify-content-between align-items-center">
                                    {isActionAllowed && <UploadPhoto />}
                                    {page === 1 && photos && <SearchPhoto />}
                                </div>
                                {photos &&
                                    photos.length > 0 &&
                                    isActionAllowed && (
                                        <small className="d-flex align-items-center gap-1">
                                            <span className="pi pi-info-circle"></span>
                                            Right click or keep pressing to edit
                                            or delete a photo.
                                        </small>
                                    )}
                            </div>
                        )}
                        {isLoading && (
                            <CustomMessage
                                loading={true}
                                error="Loading photos..."
                            />
                        )}
                        {!isLoading && error && <CustomMessage error={error} />}
                    </Col>
                </Row>
                <div className="d-flex justify-content-center pb-5 pt-4">
                    <Galleria
                        ref={galleria}
                        value={photos}
                        numVisible={7}
                        caption={isVisible && caption}
                        activeIndex={activeIndex}
                        onItemChange={(e) => setActiveIndex(e.index)}
                        circular
                        onClick={handleCaptionVisibility}
                        fullScreen
                        showItemNavigators
                        item={itemTemplate}
                        showThumbnails={false}
                        thumbnail={thumbnailTemplate}
                    />
                    <div className="profile-gallery-grid">
                        {!isLoading &&
                            !error &&
                            photos &&
                            photos.map((photo, index) => {
                                const { _id: photoId } = photo;

                                return (
                                    <SinglePhoto
                                        key={photoId}
                                        photo={photo}
                                        index={index}
                                        galleria={galleria}
                                        setActiveIndex={setActiveIndex}
                                        isActionAllowed={isActionAllowed}
                                    />
                                );
                            })}
                    </div>
                </div>
            </Container>
            {totalPages > 1 && (
                <CustomPagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}
        </>
    );
};

export default ProfilePhotos;
