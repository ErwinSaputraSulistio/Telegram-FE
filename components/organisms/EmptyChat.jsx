import css from '../../styles/css/components/organisms.module.css'

export default function EmptyChat() {
   return(
      <div className={"displayRow " + css.emptyChat}>
         Please select a chat to start messaging
      </div>
   )
}