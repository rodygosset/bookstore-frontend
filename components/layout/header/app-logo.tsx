
import styles from "@styles/layout/header/app-logo.module.scss"
import Image from "next/image"

const AppLogo = () => {

    return (
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
    )

}

export default AppLogo