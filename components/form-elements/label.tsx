import styles from "@styles/components/form-elements/text-field.module.scss"

interface Props {
    children: any;
    className?: string;
    htmlFor?: string;
}


const Label = ({ children, className, htmlFor}: Props) => {

    const getClassNames = () => {
        let classNames = styles.label
        classNames += (className ? ' ' + className : '')
        return classNames
    }

    return (
        <label 
            className={getClassNames()} 
            htmlFor={htmlFor}>
            { children }
        </label>
    )
}

export default Label