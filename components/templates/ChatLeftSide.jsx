import css from '../../styles/css/components/templates.module.css'
import { useState } from 'react'
// ORGANISMS
import Chat from '../organisms/ChatLeftSide/Chat'
import Settings from '../organisms/ChatLeftSide/Settings'
import Contacts from '../organisms/ChatLeftSide/Contacts'
import Calls from '../organisms/ChatLeftSide/Calls'
import SaveMessages from '../organisms/ChatLeftSide/SaveMessages'
import InviteFriends from '../organisms/ChatLeftSide/InviteFriends'
import TelegramFAQ from '../organisms/ChatLeftSide/TelegramFAQ'

export default function ChatLeftSideTemplate({ data, del, func }) {
   const [menuSelection, setMenuSelection] = useState(null)
   const [menuVisibility, switchVisibility] = useState(true)
   return(
      <div className={"displayRow " + css.chatLeftSide}>
         <div className={menuVisibility === false ? css.hideChatLeftSide + " " + css.chatLeftSideVisibility : css.chatLeftSideVisibility}>
            {
            menuSelection === "Settings" ?
            <Settings backFunc={ () => { setMenuSelection(null) } }/>
            :
            menuSelection === "Contacts" ?
            <Contacts backFunc={ () => { setMenuSelection(null) } }/>
            :
            menuSelection === "Calls" ?
            <Calls backFunc={ () => { setMenuSelection(null) } }/>
            :
            menuSelection === "SaveMessages" ?
            <SaveMessages backFunc={ () => { setMenuSelection(null) } }/>
            :
            menuSelection === "InviteFriends" ?
            <InviteFriends backFunc={ () => { setMenuSelection(null) } }/>
            :
            menuSelection === "TelegramFAQ" ?
            <TelegramFAQ backFunc={ () => { setMenuSelection(null) } }/>
            :
            <Chat 
               passDatasFromTemplates={data} 
               passFuncsFromTemplates={[
                  () => { setMenuSelection(null) }, 
                  () => { setMenuSelection("Settings") }, 
                  () => { setMenuSelection("Contacts") },
                  () => { setMenuSelection("Calls") },
                  () => { setMenuSelection("SaveMessages") },
                  () => { setMenuSelection("InviteFriends") },
                  () => { setMenuSelection("TelegramFAQ") },
                  func,
                  del
               ]}
               switchVisibility={ () => switchVisibility(!menuVisibility) }
            />
            }
         </div>
         <div 
            className={menuVisibility === true ? css.hideChatLeftSide + " " + css.hideThisInDesktop : css.hideThisInDesktop + " displayRow " + css.chatLeftSideSwitch} 
            onClick={ () => { switchVisibility(!menuVisibility) } }
         >
            {">"}
         </div>
      </div>
   )
}