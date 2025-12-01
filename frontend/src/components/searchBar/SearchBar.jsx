import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { Row } from 'react-bootstrap';
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
        <Row className="pt-5">
            <form onSubmit={onSubmit} className={`col ${styles.form}`}>
                <div>
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
                </div>
            </form>
        </Row>
    );
};

export default SearchBar;
