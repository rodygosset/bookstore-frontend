
import styles from "@styles/layout/header/app-logo.module.scss"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

const AppLogo = () => {

    const router = useRouter()

    return (
        <div className={styles.appName} onClick={() => router.push('/')}>
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
            <Link href="/">BookStore</Link>
        </div>
    )

}

export default AppLogo