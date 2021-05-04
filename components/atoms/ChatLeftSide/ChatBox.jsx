import css from '../../../styles/css/components/atoms.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
// IMPORT IMAGES
import SaveMessages from '../../../img/SaveMessages.png'
import Check from '../../../img/doubleCheck.png'
import Delete from '../../../img/deleteBtn.png'
import Swal from 'sweetalert2'

export default function ChatBox({ del, func, image, name, unique, userid }) {
   const [latestMessage, setLatestMessage] = useState("")
   const deleteChatHistory = () => {
      axios.delete(process.env.SERVER + "/chat/history/" + unique)
      .then((res) => { 
         Swal.fire("Berhasil!", res.data.outputData, "success")
         .then(() => { 
            del()
            setLatestMessage("")
         }) 
      })
      .catch((err) => { Swal.fire("Error?!", err.response.data.errorMessage, "error") })
   }
   useEffect(() => {
      axios.get(process.env.SERVER + "/chat/latest/" + unique)
      .then((res) => { setLatestMessage(res.data.outputData.message) })
      .catch((err) => { console.log(err.response) })
   }, [])
   return(
      <div className={"displayRow " + css.chatBox}>
         <div className={"displayRow hoverThis " + css.insideChatBox} img={image} user={name} userid={userid} onClick={func} serial={unique} >
            <img className={css.chatUserImage} img={image} user={name} userid={userid} serial={unique} src={image}/>
            <div className={"displayColumn " + css.chatBoxInfo} img={image} user={name} userid={userid} serial={unique}>
               <div className={"displayRow " + css.chatBoxInfoRow} img={image} user={name} userid={userid} serial={unique}>
                  <div className={css.chatUserName} img={image} user={name} userid={userid} serial={unique}>{name}</div>
                  <div className={css.chatTime} img={image} user={name} userid={userid} serial={unique}>00:00</div>
               </div>
               <div className={"displayRow " + css.chatBoxInfoRow} img={image} user={name} userid={userid} serial={unique}>
                  <div className={css.chatMessage} img={image} user={name} userid={userid} serial={unique}>{latestMessage}</div>
               </div>
            </div>
         </div>
         <div className={"displayRow " + css.chatBoxOption}>
            <img className={"hoverThis " + css.saveMessages} src={SaveMessages}/>
            <img className={"hoverThis " + css.doubleCheck} src={Check}/>
            <img className={"hoverThis " + css.deleteBtn} src={Delete} onClick={ () => { deleteChatHistory() } }/>
         </div>
      </div>
   )
}