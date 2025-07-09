const CustomMessage = ({ error }) => {
    return (
        <div className="bg-white border py-2 px-3">
            <div className="bg-body-secondary py-4 px-3">
                <p className="mb-0 text-center text-secondary">{error}.</p>
            </div>
        </div>
    );
};

export default CustomMessage;
