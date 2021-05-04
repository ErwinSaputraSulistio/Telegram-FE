import css from '../../../styles/css/components/molecules.module.css'
// LOGO
import ChatPlus from '../../../img/chatPlus.png'
import ChatEmoji from '../../../img/chatEmoji.png'
import ChatPhoto from '../../../img/chatPhoto.png'

export default function TypeMessage({ message, passFuncsFromOrganisms }) {
   return(
      <div className={"displayRow " + css.typeMessage}>
         <div className={"displayRow " + css.typeMessageBorder}>
            <form style={{width: "100%"}} onSubmit={passFuncsFromOrganisms[1]}>
               <input 
                  className={css.typeMessageInput} 
                  placeholder="Type your message ..." 
                  onChange={passFuncsFromOrganisms[0]} 
                  style={{background: "transparent", width: "100%"}} 
                  type="text" 
                  value={message}
               />
            </form>
            <div className={"displayRow"} style={{alignItems: "center"}}>
               <img className={"hoverThis " + css.chatThreeBtnLogo} src={ChatPlus}/>
               <img className={"hoverThis " + css.chatThreeBtnLogo} src={ChatEmoji}/>
               <img className={"hoverThis " + css.chatThreeBtnLogo} src={ChatPhoto}/>
            </div>
         </div>
      </div>
   )
}