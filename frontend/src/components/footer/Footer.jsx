const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className="col py-2">
            <small>&copy; Copyright {currYear} &ndash; Andrea Facco</small>
        </footer>
    );
};

export default Footer;
