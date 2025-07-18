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
            <h2 className="custom-message-text mb-0 text-center">{error}</h2>
        </div>
    );
};

export default CustomMessage;
