import css from '../../../styles/css/components/molecules.module.css'
import Search from '../../../public/img/Search.png'

export default function FriendSearch({ onCg, val }) {
   return(
      <div className={"displayRow " + css.chatSearch}>
         <div className={"displayRow " + css.chatSearchBorder} style={{width: "100%"}}>
            <img className={css.logoSize} src={Search}/>
            <input className={css.searchInputBox} onChange={onCg} placeholder="Search a user ..." value={val}/>
         </div>
      </div>
   )
}