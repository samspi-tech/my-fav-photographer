import './customMessage.css';
import { ProgressSpinner } from 'primereact/progressspinner';

const CustomMessage = ({ error, loading }) => {
    return (
        <div className="custom-message-container py-5 d-flex flex-column justify-content-center align-items-center gap-2">
            {loading ? (
                <ProgressSpinner
                    strokeWidth="8"
                    animationDuration=".5s"
                    className="custom-message-spinner"
                />
            ) : (
                <span className="pi pi-exclamation-triangle fs-4"></span>
            )}
            <p className="mb-0 text-center fs-5">{error}</p>
        </div>
    );
};

export default CustomMessage;
