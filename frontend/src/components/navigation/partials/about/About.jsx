import './about.css';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <>
            <Button
                text
                tooltip="About"
                icon="pi pi-info-circle"
                onClick={handleIsVisible}
                className="nav-end-icon shadow-none bg-transparent ms-2"
                tooltipOptions={{ position: 'bottom' }}
            />
            <Dialog
                header={
                    <div className="d-flex align-items-center gap-2">
                        <span className="pi pi-info-circle fs-4"></span>
                        About
                    </div>
                }
                visible={isVisible}
                onHide={handleIsVisible}
                className="custom-dialog"
            >
                <h4 className="fw-bold">
                    Thank you for visiting this website!
                </h4>
                <p>
                    The purpose of this project is to showcase the skills I
                    acquired during my time at the{' '}
                    <a
                        target="_blank"
                        className="about-link"
                        href="https://epicode.com/en/"
                    >
                        Epicode
                    </a>{' '}
                    Web Developer Bootcamp.
                </p>
                <div className="about-socials d-flex gap-3 mt-4">
                    <a href="https://github.com/samspi-tech" target="_blank">
                        <span className="pi pi-github"></span>
                        Github
                    </a>
                    <a
                        href="https://www.linkedin.com/in/andrea-facco-2694a5346/"
                        target="_blank"
                    >
                        <span className="pi pi-linkedin"></span>
                        LinkedIn
                    </a>
                </div>
            </Dialog>
        </>
    );
};

export default About;
