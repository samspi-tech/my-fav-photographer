import { Dialog } from 'primereact/dialog';
import { useContext, useRef, useState } from 'react';
import { ContextMenu } from 'primereact/contextmenu';
import PhotoDescriptionForm from './PhotoDescriptionForm.jsx';
import { PhotoContext } from '../../../../../contexts/PhotoContext.jsx';

const SinglePhoto = ({
    photo,
    setActiveIndex,
    index,
    galleria,
    formik,
    isActionAllowed,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const handleEditPhotoVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const contextMenu = useRef(null);

    const { user: userId, _id: photoId, photo: singlePhoto } = photo;

    const { deletePhoto, getPhotographerPhotos } = useContext(PhotoContext);

    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            command: handleEditPhotoVisibility,
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: async () => {
                await deletePhoto(userId, photoId);
                await getPhotographerPhotos(userId);
            },
        },
    ];

    let photoEl = (
        <img
            src={singlePhoto}
            alt={singlePhoto}
            className="profile-gallery-photo"
            onContextMenu={(e) => contextMenu.current.show(e)}
            onClick={() => {
                setActiveIndex(index);
                galleria.current.show();
            }}
        />
    );
    return (
        <>
            <div className="photo-container">
                {photoEl}
                {isActionAllowed && (
                    <ContextMenu
                        model={items}
                        ref={contextMenu}
                        className="custom-menu"
                    />
                )}
            </div>
            <Dialog
                visible={isVisible}
                onHide={handleEditPhotoVisibility}
                header="Edit tags and description."
                className="form-edit-photo"
            >
                <PhotoDescriptionForm formik={formik} photo={photo} />
            </Dialog>
        </>
    );
};

export default SinglePhoto;
