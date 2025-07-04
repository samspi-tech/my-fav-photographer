const ErrorMessage = ({ error }) => {
    return (
        <small className="text-danger d-flex align-items-center gap-1 mt-1">
            <span className="pi pi-times-circle"></span>
            {error}
        </small>
    );
};

export default ErrorMessage;
