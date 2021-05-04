import css from '../../../styles/css/components/molecules.module.css'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import axios from 'axios'
// ATOMS
import Setting from '../../atoms/ChatLeftSide/SettingsBtn'
// LOGOS
import Notification from '../../../img/Notification.png'
import Privacy from '../../../img/Privacy.png'
import Logout from '../../../img/Logout.png'

export default function MoreSettings() {
   // BASE CONF
   const router = useRouter()
   // FUNCS
   const logoutAccount = () => {
      Swal.fire("Logout sukses!", "Berhasil log out, mengarahkan kembali ke halaman login ~", "success")
      .then(() => { 
         axios.get(process.env.SERVER + "/user/logout/" + localStorage.getItem("userId"))
         .then(() => {
            localStorage.clear()
            router.push("/login") 
         })
         .catch((err) => { console.log(err.response) })
      })
   }
   return(
      <div className={"displayColumn " + css.moreSettings}>
         <div className={css.moreSettingsText}>More Settings</div>
         <Setting icon={Notification} text="Notification and Sounds"/>
         <Setting icon={Privacy} text="Privacy and Security"/>
         <Setting func={ () => { logoutAccount() } } icon={Logout} text="Log Out"/>
      </div>
   )
}