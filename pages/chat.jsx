import css from '../styles/css/pages/chat.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Swal from 'sweetalert2'
import axios from 'axios'
import io from 'socket.io-client'
// TEMPLATES
import ChatLeftSide from '../components/templates/ChatLeftSide'
import ChatRightSide from '../components/templates/ChatRightSide'
// REACT - TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Chat() {
   const router = useRouter()
   const [chatConnection, setChatConnection] = useState([])
   const [connectionID, setConnectionID] = useState(null)
   const [connectionData, setConnectionData] = useState(null)
   const [triggerData, setTriggerData] = useState(true)
   // TES CONF
   const [socket, setSocket] = useState(null)
   const setupSocket = ()=>{
      const newSocket = io("http://localhost:2500")
      // console.log(newSocket);
      // newSocket.on("connect", ()=>{
      //   console.log('connect');
      // })
      setSocket(newSocket)
   }
   // START CHAT FUNCTION
   const startChat = (e) => { 
      setConnectionData({image: e.target.getAttribute("img"), name: e.target.getAttribute("user"), user_id: e.target.getAttribute("userid")})
      setConnectionID(e.target.getAttribute("serial"))
   }
   useEffect(() => {
      setupSocket()
      if(localStorage.getItem("jwtToken") === null) { 
         Swal.fire("Login dulu, yuk?!", "Agar bisa chatting dengan teman-teman kamu, pertama-tama login dulu yuk!", "question")
         .then(() => { router.push("/login") }) 
      }
      else {
         axios.get(process.env.SERVER + "/chat/" + localStorage.getItem("userId"))
         .then((res) => { setChatConnection(res.data.outputData) })
         .catch((err) => { console.log(err.response.data.errorMessage) })
      }
   }, [])
   // SOCKET.IO CONNECT
   const [message, setMessage] = useState('')
   const [messages, setMessages] = useState([])
   const alertNotification = (user, message) => toast(user + " : " + message)
   useEffect(() => { 
      if(socket) {
         socket.on('receiverMessage', (dataMessage) => { 
            if(localStorage.getItem("loginUserName") !== dataMessage.username) { 
               alertNotification(dataMessage.username, dataMessage.message)
               console.log("tes")
            }
         })
      }
    }, [socket])
   useEffect(() => {
      if(socket){
         socket.on('receiverMessage', (dataMessage) => {
            setMessages([...messages, dataMessage])
         })
      }
   }, [socket, messages])
   // AFTER DELETE CHAT
   const afterDelete = () => {
      setMessages([])
      setTriggerData(!triggerData)
   }
   useEffect(() => {
      if(socket){ socket.emit('initialRoom', { namaRoom: connectionID, username: localStorage.getItem("loginUserName")}) }
   }, [socket, connectionID])
   const handleSendMessage = (e) => {
      e.preventDefault()
      if(localStorage.getItem("userId") === null || localStorage.getItem("loginUserName") === null || localStorage.getItem("jwtToken") === null) {
         Swal.fire("Login dulu, yuk?!", "Agar bisa chatting dengan teman-teman kamu, pertama-tama login dulu yuk!", "question")
         .then(() => { 
            localStorage.clear()
            router.push("/login") 
         })
      }
      else {
         socket.emit('sendMessage', {
            username: localStorage.getItem("loginUserName"),
            message: message,
            room: connectionID
         })
         const chatHistory = {
            id: connectionID,
            sender: localStorage.getItem("userId"),
            receiver: connectionData.user_id,
            message: message
         }
         axios.post(process.env.SERVER + "/chat/backup", chatHistory)
         .then((res) => { console.log(res.data.outputData) })
         .catch((err) => { console.log(err.response) })
         setMessage("")
      }
   }
   useEffect(() => { setMessages([]) }, [connectionData])
   return(
      <div>
         <Head>
            <title>Telegram - Let's Chat!</title>
         </Head>
         <div className={"displayRow showInAnimation " + css.chatZone}>
            <ChatLeftSide data={chatConnection} del={ () => afterDelete() } func={ (e) => { startChat(e) } }/>
            <ToastContainer/>
            <ChatRightSide ad={triggerData} cd={connectionData} ci={connectionID} data={messages} func={[(e) => { setMessage(e.target.value) }, (e) => { handleSendMessage(e) }]} message={message}/>
         </div>
      </div>
   )
}