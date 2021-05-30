import { useEffect, useState } from 'react'
import Head from 'next/head'
import io from 'socket.io-client'

export default function Socket() {
   const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const setupSocket = ()=>{
    console.log('hello');
    const newSocket = io("https://ciwin-telegram.herokuapp.com")
    console.log(newSocket);
    newSocket.on("connect", ()=>{
      console.log('connect');
    })
    setSocket(newSocket)
  }
  useEffect(()=>{
    setupSocket()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(() => {
    if (socket){
      socket.on('recMessage', (data) => {
        // const dataMessage = messages
        // dataMessage.push(data)

        setMessages([...messages, data])
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messages])

  const handleClick = ()=>{
    socket.emit('sendMessage', message)
    setMessage('')
  }

  return (
  <div style={{textAlign: "center"}}>
      <Head>
         <title>Socket.io</title>
      </Head>
      <div style={{borderRadius: "0.5vw", margin: "1vw", padding: "1vw"}}>
         {messages.map((item, index)=>
         <div>{item}</div>
         )}
      </div>
      <div style={{display: "flex", flexDirection: "column", margin: "auto", width: "25%"}}>
         <input type="text" name="message" id="message" value={message} style={{borderRadius: "0.5vw", padding: "1vw 2vw"}} placeholder="Kirim Message" onChange={(e) => setMessage(e.target.value)}/>
         <button style={{background: "#6379F4", borderRadius: "0.5vw", color: "white", marginTop: "0.5vw", padding: "1vw 2vw"}} onClick={handleClick}>kirim message</button>
      </div>
  </div>
  )
}