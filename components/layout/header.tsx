import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@styles/layout/header.module.scss"
import Link from "next/link"
import { useRouter } from "next/router";
import AppLogo from "@components/layout/header/app-logo";
import { MouseEventHandler, useEffect, useState } from "react";

interface NavItem {
    route: string;
    label: string;
    icon: IconProp;
} 

interface NavLinkProps {
    item: NavItem
}

const NavLink = ({ item }: NavLinkProps) => {

    const { route, label, icon } = item

    const router = useRouter()


    // add the .current class if the link's route 
    // corresponds to the current route


    const [isCurrent, setIsCurrent] = useState(false)

    useEffect(() => setIsCurrent(router.asPath.split('?')[0] == route), [])

    const getClassName = () => {
        return isCurrent ? styles.current : ''
    }

    const handleNavLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        if(isCurrent) event.preventDefault()
    }

    return (
        <li 
            key={route}
            className={getClassName()}>
            <Link href={route} onClick={handleNavLinkClick}>
                <FontAwesomeIcon icon={icon} />
                { label }
            </Link>
        </li>
    )

}


const Header = () => {

    const router = useRouter()

    // if we're currently at /cart
    // hide the nav link to the cart page

    const [isCurrentRoute, setIsCurrentRoute] = useState(false)

    useEffect(() => setIsCurrentRoute(router.asPath.split('?')[0] == "/cart"), [router.asPath])

    return (
        <header className={styles.header}>
            <AppLogo/>
            <nav>
                {
                    !isCurrentRoute ?
                    <Link href="/cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        Cart
                    </Link>
                    :
                    <></>
                }
            </nav>
        </header>
    )

}

export default Header