import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = (props) => {
  const imageUrl = `${process.env.PUBLIC_URL}/Start.jpg`;
const handleLogin = ()=>{
    props.handleLogin(true)
}
  return (
    <div className={styles.container}>
        <Link to='/home'>
        <img className={styles.image} src={imageUrl} alt="Imagen" onClick={handleLogin}/>
        </Link>
      
    </div>
  );
};

export default LandingPage