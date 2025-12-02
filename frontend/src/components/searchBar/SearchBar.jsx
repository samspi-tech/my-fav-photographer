import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { Col, Row } from 'react-bootstrap';
import styles from './SearchBar.module.css';

const SearchBar = ({ id, placeholder }) => {
    const [query, setQuery] = useState('');
    const [, setSearchParams] = useSearchParams();
    const [isBtnVisible, setIsBtnVisible] = useState(false);

    const btnAnimation = isBtnVisible ? 'showBtn' : 'hideBtn';

    const handleHideBtn = () => {
        setTimeout(() => {
            setIsBtnVisible(false);
        }, 500);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        setSearchParams({ username: query });
        setQuery('');
    };

    return (
        <form onSubmit={onSubmit} className="row pt-5">
            <Col className={styles.inputContainer}>
                <input
                    id={id}
                    name={id}
                    type="text"
                    value={query}
                    onBlur={handleHideBtn}
                    placeholder={placeholder}
                    onFocus={() => setIsBtnVisible(true)}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    aria-label={placeholder}
                    className={`${styles[btnAnimation]}`}
                >
                    <HiMagnifyingGlass />
                </button>
            </Col>
        </form>
    );
};

export default SearchBar;
