import unsplashLoginPage from '../../../assets/images/unsplashLoginPage.jpg';

const LoginCover = () => {
    return (
        <div className="login-page-photo-container">
            <img
                src={unsplashLoginPage}
                alt="Dariusz Sankowski from Unsplash"
            />
        </div>
    );
};

export default LoginCover;
