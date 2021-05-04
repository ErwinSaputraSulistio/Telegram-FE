import css from '../../../styles/css/components/organisms.module.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// MOLECULES
import Back from '../../molecules/ChatLeftSide/Back'
import MoreSettings from '../../molecules/ChatLeftSide/MoreSettings'

export default function Settings({ backFunc }) {
   const router = useRouter()
   const [userData, setUserData] = useState({})
   const [updateData, setUpdateData] = useState({})
   const [updatedImage, setUpdateImage] = useState("https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif")
   // UPDATE USER DATA
   const updateChange = (e) => { setUpdateData({...updateData, [e.target.name]: e.target.value}) }
   const requestUpdateUser = (e) => {
      e.preventDefault()
      const { real_name, user_name, biodata, phone_number } = updateData
      if(
         real_name === userData.real_name && 
         user_name === userData.user_name && 
         biodata === userData.biodata && 
         phone_number === userData.phone_number
      ) { Swal.fire("Error?!", "Request update data gagal, di karenakan tidak adanya perubahan dengan data sebelumnya ~", "error") }
      else {
         const packedUpdateData = { 
            realName: real_name, 
            userName: user_name, 
            biodata, 
            phoneNumber: phone_number 
         }
         axios.put(process.env.SERVER + "/user/" + userData.user_id, packedUpdateData, {
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
         })
         .then((res) => { Swal.fire("Berhasil ~", res.data.outputData, "success") })
         .catch((err) => { Swal.fire("Error?!", err.response.data.errorMessage, "error") })
      }
   }
   // CHANGE PROFILE PICTURE
   const changeAvatar = () => {
      Swal.fire({
         icon: "info",
         title: "Change Avatar",
         text: "Silahkan pilih sebuah gambar dari komputer-mu untuk dijadikan Profile Picture baru kamu :", 
         input: 'file',
         inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload your profile picture'
         },
         confirmButtonText: 'Upload',
         showCancelButton: true,
         closeOnConfirm: false,
         animation: "slide-from-top"
         })
      .then((res) => {
         if(res.value === null){ 
            Swal.fire({
               icon: "question",
               title: "Kosong ?!", 
               text: "Gimana uploadnya nih kalau gambarnya gak ada? XD",
               })
          }
         else{
            // UPDATE AVATAR TO BACKEND
            const packValue = res.value
            const data = new FormData()
            data.append("user_image", res.value)
            axios.patch(process.env.SERVER + "/user/change/avatar/" + userData.user_id, data, {
               headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
               if(res.data.checkResult === "Failed"){
                  Swal.fire({
                     icon: "warning",
                     title: "Security Issue?!", 
                     text: res.data.jwtError,
                  })
                  .then(() => {
                     axios.get(process.env.SERVER + "/user/logout/" + localStorage.getItem("userId"))
                     .then(() => {
                        localStorage.clear()
                        router.push("/login") 
                     })
                     .catch((err) => { console.log(err.response) })
                  })
               }
               else if(res.data.statusCode === 400){
                  Swal.fire({
                     icon: "error",
                     title: "Gagal ~", 
                     text: "Perubahan gambar profile user dibatalkan, tidak ada yang berubah ~",
                  })
               }
               else{
                  // AUTO UPDATE AVATAR FRONTEND
                  const reader = new FileReader()
                  reader.addEventListener("load", () => {
                  setUpdateImage(reader.result)
                  })
                  reader.readAsDataURL(packValue)
                  Swal.fire({
                     icon: "success",
                     title: "Berhasil!", 
                     text: "Gambar profile kamu sudah berhasil di ganti nih!",
                  })
               }
               
            })
            .catch((err) => {
               if(err.response.data.statusCode === 401){
                  Swal.fire({
                     icon: "warning",
                     title: "Login ulang dulu, yuk?!", 
                     text: err.response.data.jwtError,
                  })
                  .then(() => {
                     axios.get(process.env.SERVER + "/user/logout/" + localStorage.getItem("userId"))
                     .then(() => {
                        localStorage.clear()
                        router.push("/login") 
                     })
                     .catch((err) => { console.log(err.response) })
                  })
               }
               else{
                  Swal.fire({
                     icon: "error",
                     title: "Error!", 
                     text: err.response.data.errorMessage,
                  }) 
               }
            })
            // cek format gambar -  code64, httpbin
            // axios.post("http://httpbin.org/anything", data)
            // .then((res) => {console.log(res)})
         }
      })
      .catch((err) => {
         Swal.fire({
            icon: "error",
            title: "Batal~", 
            text: "Perubahan gambar profile user dibatalkan!",
            })
         console.log(err)
      })
   }
   // USE EFFECT
   useEffect(() => {
      axios.post(process.env.SERVER + "/user/jwt", null, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
      })
      .then((res) => { 
         const { real_name, user_name, biodata, phone_number } = res.data.outputData
         setUserData(res.data.outputData)
         setUpdateData({real_name, user_name, biodata, phone_number})
         setUpdateImage(res.data.outputData.user_image)
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
   }, [])
   return(
      <div className={css.chatLeftSide}>
         <Back func={backFunc} name={"@" + updateData.user_name}/>
         <div className={"displayColumn " + css.profileSettings}>
            <img className={"hoverThis " + css.profilePicture} onClick={ () => { changeAvatar() } } src={updatedImage}/>
            <form onSubmit={ (e) => { requestUpdateUser(e) } } style={{margin: "auto"}}>
               <input className={css.profileRealName} name="real_name" onChange={ (e) => { updateChange(e) } } required type="text" value={updateData.real_name}/>
            </form>
            <div className={css.profileUserName}>@{updateData.user_name}</div>
            <div className={css.accountText}>Account</div>
            <div className={"displayRow " + css.profilePhoneNumber}>
               <div>+62</div>
               <form onSubmit={ (e) => { requestUpdateUser(e) } } style={{width: "100%"}}>
                  <input className={css.inputPhoneNumber} name="phone_number" onChange={ (e) => { updateChange(e) } } required type="number" value={updateData.phone_number}/>
               </form>
            </div>
            <div className={css.allAboutUserName}>
               <div className={"displayRow " + css.profileBigText}>
                  <div>@</div>
                  <form onSubmit={ (e) => { requestUpdateUser(e) } }>
                     <input className={css.profileBigText} name="user_name" onChange={ (e) => { updateChange(e) } } required type="text" value={updateData.user_name}/>
                  </form>
               </div>
               <div className={css.profileSmallText}>Username</div>
            </div>
            <div className={css.allAboutBiodata}>
               <form onSubmit={ (e) => { requestUpdateUser(e) } }>
                  <input className={css.profileBigText} name="biodata" onChange={ (e) => { updateChange(e) } } required value={updateData.biodata}/>
               </form>
               <div className={css.profileSmallText}>Bio</div>
            </div>
         </div>
         <MoreSettings/>
      </div>
   )
}