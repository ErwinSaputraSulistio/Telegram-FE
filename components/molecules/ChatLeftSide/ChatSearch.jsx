import css from '../../../styles/css/components/molecules.module.css'
import Search from '../../../public/img/Search.png'
import Plus from '../../../public/img/chatPlus.png'

export default function ChatSearch({ switchVisibility }) {
   return(
      <div className={"displayRow " + css.chatSearch}>
         <div className={"displayRow " + css.chatSearchBorder}>
            <img className={css.logoSize} src={Search}/>
            <input className={css.searchInputBox} placeholder="Type your message ..."/>
         </div>
         <div className={css.hideThisInDesktop + " displayRow " + css.visibilityTrigger} onClick={switchVisibility}>{"<"}</div>
         <img className={"hoverThis " + css.logoSize + " " + css.hideThisInMobile} src={Plus}/>
      </div>
   )
}