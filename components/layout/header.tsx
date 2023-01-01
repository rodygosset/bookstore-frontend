import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBookOpen, faClose, faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@styles/layout/header.module.scss"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router";
import AppLogo from "@components/layout/header/app-logo";
import { useState } from "react";
import Button from "@components/button";

interface NavItem {
    route: string;
    label: string;
    icon: IconProp;
} 


const Header = () => {

    const navItems: NavItem[] = [
        {
            route: "/",
            label: "Home",
            icon: faHome
        },
        {
            route: "/catalog",
            label: "Catalog",
            icon: faBookOpen
        },
        {
            route: "/cart",
            label: "Cart",
            icon: faShoppingCart
        }
    ]

    const router = useRouter()

    // nav & burger icon logic

    const [showNav, setShowNav] = useState(false)

    const toggleShowNav = () => setShowNav(!showNav)

    const getNavClassName = () => showNav ? styles.showNav : ''

    return (
        <header className={styles.header}>
            <AppLogo/>
            <nav className={getNavClassName()}>
            {
                showNav ?
                <Button
                    icon={faClose}
                    role="tertiary"
                    onClick={toggleShowNav}
                    hasPadding={false}
                    animateOnHover={false}
                    className={styles.closeNav}
                />
                :
                <></>
            }
                <button 
                    hidden={showNav}
                    className={styles.burgerIconContainer} 
                    onClick={toggleShowNav}>
                    <Image 
                        quality={100}
                        src={'/images/burger.svg'} 
                        alt={"burger"} 
                        priority
                        fill
                        style={{ 
                            objectFit: "contain", 
                            top: "auto"
                        }}
                    />
                </button>
                <ul>
                {
                    navItems.map(({ route, label, icon }) => {

                        const isCurrentRoute = () => router.pathname == route
                        const getClassName = () => {
                            return isCurrentRoute() ? styles.current : ''
                        }

                        return (
                            <li 
                                key={route}
                                className={getClassName()}>
                                <Link href={route}>
                                    <FontAwesomeIcon icon={icon} />
                                    { label }
                                </Link>
                            </li>
                        )
                    })
                }
                </ul>
            </nav>
        </header>
    )

}

export default Header