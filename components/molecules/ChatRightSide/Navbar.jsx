import css from '../../../styles/css/components/molecules.module.css'
// LOGO
import ProfileMenu from '../../../public/img/profileMenu.png'

export default function ChatRightSideNavbar({ cd }) {
   return(
      <div className={"displayRow " + css.chatRightSideNavbar}>
         <div className="displayRow" style={{alignItems: "center"}}>
            <img className={css.chatRightSideNavbarProfilePicture} src={cd.image}/>
            <div className="displayColumn">
               <div className={css.chatRightSideNavbarProfileName}>{cd.name}</div>
               <div className={css.chatRightSideNavbarProfileStatus}>Online</div>
            </div>
         </div>
         <img className={"hoverThis " + css.profileMenuBtn} src={ProfileMenu}/>
      </div>
   )
}