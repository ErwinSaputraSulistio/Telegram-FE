import css from '../../../styles/css/components/organisms.module.css'
import Back from '../../molecules/ChatLeftSide/Back'
import FriendSearch from '../../molecules/ChatLeftSide/FriendSearch'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
// IMAGES & LOGO
import PlusGreen from '../../../public/img/plus_green.png'

export default function InviteFriends({ backFunc }) {
   const [filterUser, setFilterUser] = useState([])
   const [alreadyFriendID, setAlreadyFriendID] = useState([])
   const [searchFriend, setSearch] = useState("")
   const [searchResult, setResult] = useState([])
   useEffect(() => { 
      setFilterUser([])
      setAlreadyFriendID([])
      // GET ALL FRIEND CANDIDATE
      axios.get(process.env.SERVER + "/user")
      .then((res) => {
         for(let i = 0; i < res.data.outputData.length; i++) {
            if(res.data.outputData[i].user_id !== localStorage.getItem("userId")) {
               setFilterUser(filterUser => [...filterUser, res.data.outputData[i]])
            }
         }
      })
      .catch((err) => { console.log(err.response) })
      // CHECK IF ALREADY FRIEND
      axios.get(process.env.SERVER + "/chat/" + localStorage.getItem("userId"))
      .then((res) => { 
         for(let i = 0; i < res.data.outputData.length; i++) {
            setAlreadyFriendID(alreadyFriendID => [...alreadyFriendID, res.data.outputData[i].connection_data.user_id])
         }
      })
      .catch((err) => { console.log(err.response) })
   }, [])
   // SEARCH FRIEND CHANGE
   const searchFriendChange = (e) => { setSearch(e.target.value) }
   // EVERY TIME USER TYPE SEARCH
   useEffect(() => {
      setResult([])
      if(searchFriend !== "") { 
         for(let i = 0; i < filterUser.length; i++) {
            if(
               filterUser[i].real_name.toLowerCase().includes(searchFriend.toLowerCase()) === true && 
               alreadyFriendID.includes(filterUser[i].user_id) === false) 
            {
               setResult(searchResult => [...searchResult, filterUser[i]])
            }
         }
      }
   }, [searchFriend])
   // ADD FRIEND
   const addFriend = (name, id) => {
      if(localStorage.getItem("userId") !== null || localStorage.getItem("userId") !== undefined) {
         const friendData = {
            first_id: localStorage.getItem("userId"),
            second_id: id
         }
         axios.post(process.env.SERVER + "/chat", friendData)
         .then(() => { 
            Swal.fire("Berhasil!", "Berhasil menambahkan " + name + " ke dalam daftar teman!", "success")
            .then(() => { window.location = "/chat" })
         })
         .catch((err) => { console.log(err.response) })
      }
   }
   // RETURN
   return(
      <div className={css.chatLeftSide}>
         <Back func={backFunc} name="Add Friends"/>
         <FriendSearch onCg = { (e) => { searchFriendChange(e) } } val={searchFriend}/>
         <div className={css.chatAddFriendZone}>
         {searchResult.slice(0,5).map((item) => {
            return(
               <div className={"displayRow " + css.searchFriendBorder} style={{alignItems: "center", justifyContent: "space-between"}}>
                  <div className="displayRow" style={{alignItems: "center"}}>
                     <img className={css.searchFriendImg} src={item.user_image}/>
                     <div className="displayColumn">
                        <span className={css.searchFriendName}>{item.real_name.length > 15 ? item.real_name.slice(0,15) + " ..." : item.real_name}</span>
                        <span className={css.searchFriendBio}>{item.biodata.length > 25 ? item.biodata.slice(0,25) + " ..." : item.biodata}</span>
                     </div>
                  </div>
                  <img className={"hoverThis " + css.addFriendBtn} onClick={ () => { addFriend(item.real_name, item.user_id) } } src={PlusGreen}/>
               </div>
            )
         })}
         </div>
      </div>
   )
}