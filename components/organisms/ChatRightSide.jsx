import css from '../../styles/css/components/organisms.module.css'
import ChatRightSideNavbar from '../molecules/ChatRightSide/Navbar'
import TypeMessage from '../molecules/ChatRightSide/TypeMessage'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function ChatRightSideOrganism({ ad, cd, ci, message, passDatasFromTemplates, passFuncsFromTemplates }) {
   // BASE CONF
   const router = useRouter()
   const [myUserData, setMyUserData] = useState({})
   const [chatHistory, setChatHistory] = useState([])
   // REACT HOOKS
   useEffect(() => {
      axios.post(process.env.SERVER + "/user/jwt", null, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
      })
      .then((res) => { 
         const { real_name, user_image } = res.data.outputData
         setMyUserData({ real_name, user_image })
      })
      .catch((err) => { 
         if(err.response.data.errorMessage === "Token JWT sudah expired!") { 
            Swal.fire("Login ulang, yuk?!", "Token JWT kamu sudah expired nih, silahkan login ulang demi keamanan akun kamu yah ~", "warning")
            .then(() => {
               axios.get(process.env.SERVER + "/user/logout/" + localStorage.getItem("userId"))
               .then(() => {
                  localStorage.clear()
                  router.push("/login") 
               })
               .catch((err) => { console.log(err.response) })
            })
         }
         else { Swal.fire("Error!", err.response.data.errorMessage, "error")}
      })
      axios.get(process.env.SERVER + "/chat/history/" + ci)
      .then((res) => { setChatHistory(res.data.outputData) })
      .catch((err) => { console.log(err.response) })
   }, [])
   useEffect(() => {
      axios.get(process.env.SERVER + "/chat/history/" + ci)
      .then((res) => { setChatHistory(res.data.outputData) })
      .catch(() => { setChatHistory([]) })
   }, [ci])
   useEffect(() => { setChatHistory([]) }, [ad])
   return(
      <div>
         <ChatRightSideNavbar cd={ cd }/>
         <div className={css.chatZone}>
            {chatHistory.map((item) => 
               {
                  return localStorage.getItem("userId") === item.sender_id ?
                  <div className={css.yourUserChat}>
                     <div className={"displayRow " + css.insideYourUserChat}>
                        <div></div>
                        <div className={"displayRow"} style={{alignItems: "center"}}>
                           <div className={css.yourUserChatTime}>{item.time}</div>
                           <div className={css.yourUserMessage}>{item.message}</div>
                           <img className={css.yourUserImage} src={myUserData.user_image}/>
                        </div>
                     </div>
                  </div>
                  : 
                  <div className={css.oppositeUserChat}>
                     <div className={"displayRow " + css.insideOppositeUserChat}>
                        <div className={"displayRow"} style={{alignItems: "center"}}>
                           <img className={css.oppositeUserImage} src={cd.image}/>
                           <div className={css.oppositeUserMessage}>{item.message}</div>
                           <div className={css.oppositeUserChatTime}>{item.time}</div>
                        </div>
                     </div>
                  </div>
               }
            )}
            {passDatasFromTemplates.map((item, index) =>
               {
                  return myUserData.real_name === item.username ?
                  <div className={css.yourUserChat}>
                     <div className={"displayRow " + css.insideYourUserChat}>
                        <div></div>
                        <div className={"displayRow"} style={{alignItems: "center"}}>
                           <div className={css.yourUserChatTime}>{item.time}</div>
                           <div className={css.yourUserMessage}>{item.message}</div>
                           <img className={css.yourUserImage} src={myUserData.user_image}/>
                        </div>
                     </div>
                  </div>
                  : 
                  <div className={css.oppositeUserChat}>
                     <div className={"displayRow " + css.insideOppositeUserChat}>
                        <div className={"displayRow"} style={{alignItems: "center"}}>
                           <img className={css.oppositeUserImage} src={cd.image}/>
                           <div className={css.oppositeUserMessage}>{item.message}</div>
                           <div className={css.oppositeUserChatTime}>{item.time}</div>
                        </div>
                     </div>
                  </div>
               }
            )}
         </div>
         <TypeMessage message={message} passFuncsFromOrganisms={passFuncsFromTemplates}/>
      </div>
   )
}