import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Image src="/profile.png" alt="logo" width={45} height={45} />
      </div>
      <div className={styles.header__logo__icon}>
        <Image src="/next.svg" alt="logo" width={80} height={75} />
      </div>
    </header>
  );
}
