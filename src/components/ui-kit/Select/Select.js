import React, {useEffect, useRef, useState} from 'react';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
import Arrow from '../../Icons/Arrow';

import './Select.scss';

//todo: checkbox - не используется в компоненте
const Select = ({children, disabled, multiple, options, placeholder, onChange}) => {
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
            if (multiple) {
                newIDs.push(id);
                newValues.push(value);
            } else {
                newIDs = [id];
                newValues = [value];
            }
        }

        setSelectedOptionsID(newIDs);
        setSelectedOptions(newValues);

        onChange && onChange(newIDs);

        if (!multiple) {
            setSelectOpen(false);
        }
    };

    //элементы
    const renderInputText = () =>
        multiple && selectedOptions.length
            ? options.map((value, index) => {
                const result = checkIsSelected(value.id)
                    ? <div key={value.text + index} className='select__multi-value'>
                        <div className='select__multi-label'>{value.text}</div>
                        <button
                            className='select__multi-remove'
                            onClick={(event) => onSelectInputText(event, value.text, value.text)}
                        >
                                close
                        </button>
                    </div>
                    : null;
                return result;
            })
            : !multiple && selectedOptions.length
                ? selectedOptions
                : placeholder;

    const renderOptions = () =>
        isSelectOpen
            ? options.map((elem, index) =>
                <li
                    onClick={(event) => onSelectInputText(event, elem.text, elem.id)}
                    id={elem.id}
                    key={index}
                    className={[
                        'select__option',
                        checkIsSelected(elem.id) ? 'select__option--is-selected' : '',
                    ].join(' ')}
                >
                    <span className='select__option-label'>{elem.text}</span>
                </li>
            )
            : null

    return (
        <div className={['select', isSelectOpen ? 'active' : ''].join(' ')} ref={selectRef}>
            <div
                className='select__trigger'
                onClick={() => {
                    if (!disabled) {
                        setSelectOpen(!isSelectOpen);
                    }
                }}
            >
                <div className={[
                        'select__input-text',
                        selectedOptions && selectedOptions.length
                            ? 'select__input-text--current-val'
                            : '',
                    ].join(' ')}
                >
                    {renderInputText()}
                </div>
                <div className='select__arrow-icon'>
                    {React.createElement(Arrow)}
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

Select.defaultProps = {
    disabled: false,
    required: false,
    multiple: false,
    placeholder: '',
    description: '',
    checkboxID: '',
    selectID: '',
};

export default Select;
