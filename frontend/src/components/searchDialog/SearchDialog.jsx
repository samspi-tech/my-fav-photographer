import './searchDialog.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const SearchDialog = ({ handleHide }) => {
    return (
        <>
            <div className="p-inputgroup flex-1">
                <Button icon="pi pi-search" className="search-btn px-4" />
                <InputText
                    autoFocus={true}
                    className="w-100 border"
                    placeholder="Search photographers"
                />
                <Button
                    icon="pi pi-times"
                    onClick={handleHide}
                    className="close-btn px-4"
                />
            </div>
            <div>
                <ul>
                    <li>Photographer</li>
                    <li>Photographer</li>
                    <li>Photographer</li>
                    <li>Photographer</li>
                </ul>
            </div>
        </>
    );
};

export default SearchDialog;
