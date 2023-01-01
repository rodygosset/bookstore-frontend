import styles from "@styles/layout/header.module.scss"
import Image from "next/image"


const Header = () => {

    return (
        <header className={styles.header}>
            <div className={styles.appName}>
                <div className={styles.logo}>
                    <Image 
                        quality={100}
                        src={'/favicon/favicon.svg'} 
                        alt={"Logo"} 
                        priority
                        fill
                        style={{ 
                            objectFit: "contain", 
                            top: "auto"
                        }}
                    />
                </div>
                <p>BookStore</p>
            </div>

        </header>
    )

}

export default Header