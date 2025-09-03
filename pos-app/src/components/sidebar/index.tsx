import styles from "@styles/components/sidebar.module.scss"
import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <div className={styles.overall}>
      <Link to='/' className={styles.link}>
        <img src='/icon.png' />
        <h1>Heliconia</h1>
      </Link>
      <Link to='/products' className={styles.link}>
        Productos
      </Link>
      <Link to='/categories' className={styles.link}>
        Categorias
      </Link>
      <Link to='/kitchens' className={styles.link}>
        Cocinas
      </Link>
      <Link to='/devices' className={styles.link}>
        Dispositivos
      </Link>
    </div>
  )
}

export default SideBar