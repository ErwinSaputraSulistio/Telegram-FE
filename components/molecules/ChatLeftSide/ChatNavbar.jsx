import css from '../../../styles/css/components/molecules.module.css'
import NavbarButton from '../../../public/img/navbarButton.png'
import { useState } from 'react'
// ATOMS
import HamMenuBtn from '../../atoms/ChatLeftSide/HamMenuBtn'
// IMG
import Settings from '../../../public/img/Settings.png'
import Contacts from '../../../public/img/Contacts.png'
import Calls from '../../../public/img/Calls.png'
import SaveMessages from '../../../public/img/SaveMessages.png'
import InviteFriends from '../../../public/img/InviteFriends.png'
import FAQ from '../../../public/img/FAQ.png'

export default function ChatNavbar({ passFuncsFromOrganisms }) {
   const [hamMenu, showHamMenu] = useState(false)
   return(
      <div className={"displayRow " + css.chatNavbar} style={{alignItems: "center", justifyContent: "space-between"}}>
         <div className={css.chatNavbarTelegramText}>Telegram</div>
         <div className="displayRow">
            {
            hamMenu === true ?
            <div className={"displayColumn " + css.chatNavbarHamMenu}>
               <HamMenuBtn cstmcls={css.settings} func={passFuncsFromOrganisms[1]} icon={Settings} text="Settings"/>
               <HamMenuBtn cstmcls={css.contacts} func={passFuncsFromOrganisms[2]} icon={Contacts} mgTp="2vw" mgBtm="2vw" text="Contacts"/>
               <HamMenuBtn cstmcls={css.inviteFriends} func={passFuncsFromOrganisms[5]} icon={InviteFriends} text="Add Friends"/>
               <HamMenuBtn cstmcls={css.calls} func={passFuncsFromOrganisms[3]} icon={Calls} mgTp="2vw" mgBtm="2vw" text="Calls"/>
               <HamMenuBtn cstmcls={css.saveMessages} func={passFuncsFromOrganisms[4]} icon={SaveMessages} text="Save Messages"/>
               <HamMenuBtn cstmcls={css.telegramFAQ} func={passFuncsFromOrganisms[6]} icon={FAQ} mgTp="2vw" text="Telegram FAQ"/>
            </div>
            :
            null
            }
            <img className={"hoverThis " + css.chatNavbarToggle} onClick={ () => { showHamMenu(!hamMenu) } } src={NavbarButton}/>
         </div>
      </div>
   )
}