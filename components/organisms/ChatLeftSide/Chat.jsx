import css from '../../../styles/css/components/organisms.module.css'
import { useState } from 'react'
import ChatNavbar from '../../molecules/ChatLeftSide/ChatNavbar'
import ChatSearch from '../../molecules/ChatLeftSide/ChatSearch'
import ChatSort from '../../molecules/ChatLeftSide/ChatSort'
import ChatGroup from '../../molecules/ChatLeftSide/ChatGroup'

export default function Chat({ passDatasFromTemplates, passFuncsFromTemplates }) {
   const [sortChat, setSortChat] = useState("All")
   return(
      <div className={css.chatLeftSide}>
         <ChatNavbar passFuncsFromOrganisms={passFuncsFromTemplates}/>
         <ChatSearch/>
         <ChatSort passFuncsFromOrganisms={[
            sortChat, 
            () => { setSortChat("All") }, 
            () => { setSortChat("Important") }, 
            () => { setSortChat("Unread") }
         ]}/>
         <ChatGroup del={ passFuncsFromTemplates[8] } passDatasFromOrganisms={ passDatasFromTemplates } passFuncsFromOrganisms={ passFuncsFromTemplates[7] }/>
      </div>
   )
 }