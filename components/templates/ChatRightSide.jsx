import css from '../../styles/css/components/templates.module.css'
import EmptyChat from '../organisms/EmptyChat'
import ChatRightSideOrganism from '../organisms/ChatRightSide'

export default function ChatRightSideTemplate({ ad, cd, ci, data, func, message }) {
   return(
      <div className={css.chatRightSide}>
         {cd === null ?
         <EmptyChat/>
         :
         <ChatRightSideOrganism ad={ad} cd={cd} ci={ci} message={message} passDatasFromTemplates={data} passFuncsFromTemplates={func}/>
         }
      </div>
   )
}