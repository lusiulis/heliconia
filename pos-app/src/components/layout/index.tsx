import { Outlet } from "react-router-dom"
import SideBar from "../sidebar"
import styles from "@styles/components/layout.module.scss"


const Layout = () => {
  return (
    <main className={styles.overall}>
      <SideBar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  )
}

export default Layout