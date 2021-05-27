import css from '../../../styles/css/components/organisms.module.css'
import Back from '../../molecules/ChatLeftSide/Back'
import FriendSearch from '../../molecules/ChatLeftSide/FriendSearch'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
// IMAGES & LOGO
import MinusRed from '../../../public/img/minus_red.jpg'

export default function Contacts({ backFunc }) {
   // USE STATE
   const [myFriendList, setFriendList] = useState([])
   const [searchFriend, setSearch] = useState("")
   // USE EFFECT
   useEffect(() => {
      axios.get(process.env.SERVER + "/chat/" + localStorage.getItem("userId"))
      .then((res) => { setFriendList(res.data.outputData) })
      .catch((err) => { console.log(err.response) })
   }, [])
   // SEARCH FRIEND
   const searchFriendChange = (e) => { setSearch(e.target.value) }
   console.log(myFriendList)
   // REMOVE FRIEND
   // ADD FRIEND
   const removeFriend = (name, id) => {
      axios.delete(process.env.SERVER + "/chat/connection/" + id)
      .then(() => { 
         Swal.fire("Berhasil!", "Berhasil menghapus " + name + " dari daftar pertemanan!", "success")
         .then(() => { window.location = "/chat" })
      })
      .catch((err) => { console.log(err.response) })
   }
   return(
      <div className={css.chatLeftSide}>
         <Back func={backFunc} name="My Friend List"/>
         <FriendSearch onCg = { (e) => { searchFriendChange(e) } } val={searchFriend}/>
         <div className={css.chatAddFriendZone}>
         {myFriendList.slice(0,5).map((item) => {
            if(item.connection_data.real_name.toLowerCase().includes(searchFriend.toLowerCase()) === true) {
               return(
                  <div className={"displayRow " + css.searchFriendBorder} style={{alignItems: "center", justifyContent: "space-between"}}>
                     <div className="displayRow" style={{alignItems: "center"}}>
                        <img className={css.searchFriendImg} src={item.connection_data.user_image}/>
                        <div className="displayColumn">
                           <span className={css.searchFriendName}>{item.connection_data.real_name.length > 15 ? item.connection_data.real_name.slice(0,15) + " ..." : item.connection_data.real_name}</span>
                           <span className={css.searchFriendBio}>{item.connection_data.biodata.length > 25 ? item.connection_data.biodata.slice(0,25) + " ..." : item.connection_data.biodata}</span>
                        </div>
                     </div>
                     <img className={"hoverThis " + css.addFriendBtn} onClick={ () => { removeFriend(item.connection_data.real_name, item.connection_data.connection_id) } } src={MinusRed}/>
                  </div>
               )
            }
         })}
         </div>
      </div>
   )
}