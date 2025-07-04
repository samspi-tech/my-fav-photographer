import './pageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="page-not-found d-flex justify-content-center align-items-center gap-3">
            <h1 className="display-1 fw-bold mb-0">
                <span>4</span>
                <span className="mx-2">0</span>
                <span>4</span>
            </h1>
            <h2 className="fw-bold display-2">
                <span>-</span> Page Not Found
            </h2>
        </div>
    );
};

export default PageNotFound;
