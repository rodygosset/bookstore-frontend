import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@styles/components/button.module.scss"
import React, { LegacyRef } from "react";
import { MouseEventHandler } from "react";

interface Props {
    children?: any;
    onClick: (event?: any) => void;
    onMouseOver?: (event?: any) => void;
    onMouseLeave?: (event?: any) => void;
    type?: "button" | "submit" | "reset" | undefined;
    role?: "primary" | "secondary" | "tertiary";
    icon?: IconProp;
    active?: boolean;
    animateOnHover?: boolean;
    hasPadding?: boolean;
    bigPadding?: boolean;
    fullWidth?: boolean;
    className?: string;
}

const Button = ({ 
        children, 
        onClick, 
        onMouseOver,
        onMouseLeave,
        type, 
        role, 
        icon, 
        active = true, 
        animateOnHover = true,
        hasPadding = true, 
        bigPadding, 
        fullWidth,
        className,
    }: Props, ref: LegacyRef<HTMLButtonElement>) => {

    const getClassNames = () => {
        let classNames = styles.button
        classNames += (active ? ' ' + styles.active : '') 
        classNames += (animateOnHover ? ' ' + styles.animateOnHover : '') 
        classNames += (hasPadding ? ' ' + styles.withPadding : '') 
        classNames += (bigPadding ? ' ' + styles.bigPadding : '') 
        classNames += (fullWidth ? ' ' + styles.fullWidth : '')
        classNames += ' ' + (role ? styles[role] : styles.primary)
        classNames += (className ? ' ' + className : '')
        return classNames
    }

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        if(active) onClick(event)
    }

    return (
        <button
            ref={ref}
            className={getClassNames()}
            onClick={handleClick}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            type={type}>
            { icon && <FontAwesomeIcon icon={icon} /> }
            { children }
        </button>
    )
}

export default React.forwardRef<HTMLButtonElement, Props>(Button)