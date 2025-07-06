import './logo.css';

const Logo = ({ cssClass }) => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <h1 className={`${cssClass} d-flex flex-column gap-1 mb-0`}>
                <span>My</span>
                <span>Fav</span>
                <span>Photographer</span>
            </h1>
        </div>
    );
};

export default Logo;
