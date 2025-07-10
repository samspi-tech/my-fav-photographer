const CustomMessage = ({ error }) => {
    return (
        <div className="bg-white">
            <div className="bg-body-secondary py-5 px-3">
                <p className="mb-0 text-center text-secondary">{error}.</p>
            </div>
        </div>
    );
};

export default CustomMessage;
