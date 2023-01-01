import Button from "@components/button"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import styles from "@styles/pages/404.module.scss"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"


const My404 = () => {

    const router = useRouter()

    const handleClick = () => router.push("/")

    return (
        <div className={styles.container}>
            <div className={styles.illustrationContainer}>
                <Image 
                    quality={100}
                    src={'/images/404.svg'} 
                    alt={"404 Illustration"} 
                    priority
                    fill
                    style={{ 
                        objectFit: "contain", 
                        top: "auto"
                    }}
                />
            </div>
            <div className={styles.errorMessageContainer}>
                <h2>Oups!</h2>
                <p>This page doesn't exist :-(</p>
            </div>
            <Button
                icon={faHome}
                role="secondary"
                onClick={handleClick}>
                <Link href="/">Go to the home page</Link>
            </Button>
        </div>
    )
}

export default My404