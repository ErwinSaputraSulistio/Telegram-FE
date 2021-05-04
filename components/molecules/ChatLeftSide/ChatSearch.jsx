import css from '../../../styles/css/components/molecules.module.css'
import Search from '../../../img/Search.png'
import Plus from '../../../img/chatPlus.png'

export default function ChatSearch() {
   return(
      <div className={"displayRow " + css.chatSearch}>
         <div className={"displayRow " + css.chatSearchBorder}>
            <img className={css.logoSize} src={Search}/>
            <input className={css.searchInputBox} placeholder="Type your message ..."/>
         </div>
         <img className={"hoverThis " + css.logoSize} src={Plus}/>
      </div>
   )
}