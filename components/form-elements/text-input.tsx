import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@styles/components/form-elements/text-field.module.scss"
import { ChangeEventHandler } from "react";

interface Props {
    icon?: IconProp;
    type?: 'text' | 'password' | 'email' | 'date';
    name?: string;
    id?: string;
    placeholder?: string;
    onChange: (newVal: string) => void;
    defaultValue?: string;
    currentValue?: string;
    className?: string;
}

const TextInput = ({ 
    icon,
    type = "text", 
    name, 
    id, 
    placeholder, 
    onChange, 
    defaultValue,
    currentValue,
    className }: Props) => {

    const getClassNames = () => {
        let classNames = styles.textInput
        classNames += (className ? ' ' + className : '')
        return classNames
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
        event.preventDefault()
        onChange(event.target.value)
    }

    return (
        <>
        {
            icon ?
            <div className={getClassNames()}>
                <FontAwesomeIcon icon={icon}/>
                <input 
                    onChange={handleChange}
                    type={type} 
                    name={name} 
                    id={id} 
                    defaultValue={defaultValue}
                    value={currentValue}
                    placeholder={placeholder}
                />
            </div>
            :
            <input 
                className={getClassNames()}
                onChange={handleChange}
                type={type} 
                name={name} 
                id={id} 
                defaultValue={defaultValue}
                value={currentValue}
                placeholder={placeholder}
            />
        }
        </>
        
    )
}

export default TextInput