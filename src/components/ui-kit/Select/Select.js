import React, {useEffect, useRef, useState} from 'react';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
import Arrow from '../../Icons/Arrow';
import Close from '../../Icons/Close';
import './Select.scss';

const Select = ({options, placeholder}) => {
    const selectRef = useRef();

    const [isSelectOpen, setSelectOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptionsID, setSelectedOptionsID] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!selectRef.current?.contains(event.target)) {
                setSelectOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const checkIsSelected = (id) => {
        if (selectedOptionsID.length === 0) {
            return false;
        }

        return selectedOptionsID.find((elem) => elem === id) !== undefined;
    }

    //обработчики
    const onSelectInputText = (e, value, id) => {
        let newIDs = [...selectedOptionsID];
        let newValues = [...selectedOptions];
        const isSelected = checkIsSelected(id);
        e.stopPropagation();

        if (isSelected) {
            newIDs = newIDs.filter((elem) => elem !== id);
            newValues = newValues.filter((elem) => elem !== value);
        } else {
                newIDs = [id];
                newValues = [value];
        }

        setSelectedOptionsID(newIDs);
        setSelectedOptions(newValues);

        setSelectOpen(false);
    };

    //Отрисовывает либо выбранный айтем либо placeholder
    const renderInputText = () =>
        selectedOptions.length
            ? selectedOptions
            : placeholder

    //Рендерить список элементов, если селект открыт
    const renderOptions = () =>
        isSelectOpen
            ? options.map((elem, index) =>
                <li
                    onClick={(event) => onSelectInputText(event, elem.text, elem.id)}
                    id={elem.id}
                    key={index}
                    className='select__option'
                >
                    <span className='select__option-label'>{elem.text}</span>
                </li>
            )
            : null

    //Очистка выбранного айтема в селекте
    const close = () =>
        selectedOptions && selectedOptions.length
            ?   <div className='select__close-icon' onClick={(e) => {e.preventDefault();}}>
                    {React.createElement(Close)}
                </div>
            : null

    return (
        <div className={['select', isSelectOpen ? 'active' : ''].join(' ')} ref={selectRef}>
            <div className='select__trigger' onClick={() => setSelectOpen(!isSelectOpen)}>
                <div className={[
                        'select__input-text',
                        selectedOptions && selectedOptions.length
                            ? 'select__input-text--current-val'
                            : '',
                    ].join(' ')}
                >
                    {renderInputText()}
                </div>
                <div className='select__icon-wrap'>
                    {close()}
                    <div className='select__arrow-icon'>
                        {React.createElement(Arrow)}
                    </div>
                </div>
            </div>
            <div className='select__menu-wrap'>
                <OverlayScrollbarsComponent>
                    <ul className='select__menu'>
                        {options?.length
                            ? renderOptions()
                            : <div className='select__no-options'>Нет данных для выбора</div>
                        }
                    </ul>
                </OverlayScrollbarsComponent>
            </div>
        </div>
    );
};

export default Select;
