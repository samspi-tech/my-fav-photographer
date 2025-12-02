import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass, HiArrowPath } from 'react-icons/hi2';
import { Col } from 'react-bootstrap';
import styles from './SearchBar.module.css';

const SearchBar = ({ id, placeholder }) => {
    const [query, setQuery] = useState('');
    const [isBtnVisible, setIsBtnVisible] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const username = searchParams.get('username');

    const btnAnimation = isBtnVisible ? 'showBtn' : 'hideBtn';

    const handleHideBtn = () => {
        setTimeout(() => {
            setIsBtnVisible(false);
        }, 500);
    };

    const handleResetSearchParams = () => searchParams.set('');

    const onSubmit = (e) => {
        e.preventDefault();

        setSearchParams({ username: query });
        setQuery('');
    };

    return (
        <form onSubmit={onSubmit} className="row pt-5 align-items-center">
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
                    className={`${styles.searchBtn} ${styles[btnAnimation]}`}
                >
                    <HiMagnifyingGlass />
                </button>
            </Col>
            {username && (
                <Col>
                    <button
                        className={styles.resetBtn}
                        onClick={handleResetSearchParams}
                    >
                        <HiArrowPath />
                    </button>
                </Col>
            )}
        </form>
    );
};

export default SearchBar;
