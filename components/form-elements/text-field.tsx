import styles from "@styles/components/form-elements/text-field.module.scss"

interface Props {
    children: any;
    className?: string;
}


const TextField = ({ children, className }: Props) => {

    const getClassNames = () => {
        let classNames = styles.textField
        classNames += (className ? ' ' + className : '')
        return classNames
    }

    return (
        <div className={getClassNames()}>{ children }</div>
    )
}

export default TextField