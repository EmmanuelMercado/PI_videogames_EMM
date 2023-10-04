import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
const NavBar = (props)=>{
    return(
        <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
        <Link to="/home">
          <img src="logo.png" alt="Logo de la empresa"/>
        </Link>
        </div>
        <div className={styles.navbarCenter}>
            
            <h1>Henry Videogames</h1>
            
        </div>
        <div className={styles.navbarRight}>
            <Link to="/Form">
            <h3>New videogame</h3>
            </Link>
        </div>
      </nav>
    )
}

export default NavBar;  


      