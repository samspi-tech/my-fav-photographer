import './loadingButton.css';
import { Spinner } from 'react-bootstrap';

const LoadingButton = () => {
    return (
        <div className="loading-btn d-flex justify-content-center align-items-center w-100">
            <Spinner animation="border" role="status"></Spinner>
        </div>
    );
};

export default LoadingButton;
