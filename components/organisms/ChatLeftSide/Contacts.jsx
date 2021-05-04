import css from '../../../styles/css/components/organisms.module.css'
import Back from '../../molecules/ChatLeftSide/Back'
import InDevelopment from '../../molecules/ChatLeftSide/InDevelopment'

export default function Contacts({ backFunc }) {
   return(
      <div className={css.chatLeftSide}>
         <Back func={backFunc} name="Contacts"/>
         <InDevelopment/>
      </div>
   )
}