import css from '../../styles/css/pages/forgotPassword.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import Swal from 'sweetalert2'
// ATOMS
import Input from '../../components/atoms/Input'
import BigButton from '../../components/atoms/BigButton'

export default function ForgotPassword() {
   // CONF
   const router = useRouter()
   const { pid } = router.query
   const [isJwtValid, setJwtValid] = useState(false)
   const [resetMail, setResetMail] = useState(null)
   const [resetPassword, setResetPassword] = useState({checkJwtToken: "", newPassword: "", retypePassword: ""})
   useEffect(() => {
      if(localStorage.getItem("loginUserName") !== null) { 
         Swal.fire("Ups, ada apa nih?!", localStorage.getItem("loginUserName") + ", jika ingin reset password akun lain harap logout terlebih dahulu!", "question")
         .then(() => { router.push("/chat") }) 
      }
   }, [])
   useEffect(() => {
      if(pid !== undefined) {
         if(pid !== "send-mail") {
            axios.get(process.env.SERVER + "/user/reset/" + pid)
            .then(() => { 
               setJwtValid(true)
               setResetPassword({ ...resetPassword, checkJwtToken: pid })
            })
            .catch(() => {
               Swal.fire("Error?!", "Token JWT untuk reset password invalid, kembali ke halaman login!", "error")
               .then(() => { router.push("/login") })
            })
         }
      }
   }, [pid])
   // ONCHANGE & SEND RESET PASSWORD MAIL
   const sendMailChange = (e) => { setResetMail(e.target.value) }
   const sendMail = (e) => {
      e.preventDefault()
      const sendThisResetMail = { userEmail: resetMail }
      axios.post(process.env.SERVER + "/user/reset/send-mail", sendThisResetMail)
      .then(() => {
         Swal.fire("Berhasil!", "Silahkan cek email kamu untuk melanjutkan proses reset password!", "success")
         .then(() => { router.push("/login") })
      })
      .catch(() => { Swal.fire("Error?!", "Terjadi sebuah kesalahan, silahkan coba lagi!", "error") })
   }
   // ONCHANGE & SET NEW PASSWORD
   const setPasswordChange = (e) => { setResetPassword({...resetPassword, [e.target.name]: e.target.value}) }
   const setNewPassword = (e) => {
      e.preventDefault()
      const { checkJwtToken, newPassword, retypePassword } = resetPassword
      const setNewPasswordData = { checkJwtToken, newPassword, retypePassword }
      axios.put(process.env.SERVER + "/user/reset/new-password", setNewPasswordData)
      .then(() => {
         Swal.fire("Berhasil!", "Proses reset password selesai, silahkan coba login dengan password baru!", "success")
         .then(() => { router.push("/login") })
      })
      .catch((err) => { Swal.fire("Error?!", err.response.data.errorMessage, "error") })
   }
   // RETURN
   return(
      <div className={"authBg displayRow"}>
         <Head>
            <title>Telegram - Forgot Password</title>
         </Head>
         <div className="authBorder displayColumn showInAnimation">
            {isJwtValid === false 
            ?
            <form onSubmit={ (e) => { sendMail(e) } } style={{textAlign: "center"}}>
               <div className={"displayRow " + css.authBigTitle}>
                  <div className="hoverThis" onClick={ () => { router.push("/login") } }>{"<"}</div>
                  <div style={{textAlign: "center", width: "100%"}}>Forgot Password</div>
               </div>
               <div className={css.authSmallTitle}>You’ll get messages soon on your e-mail</div>
               <Input
                  ipCg={ (e) => { sendMailChange(e) } }
                  ipLbl="Email" 
                  ipTy="email" 
                  plcHldr="Input your email here" 
                  val={resetMail}
               />
               <div className={css.gapBetweenInputAndRegister}>
                  <BigButton 
                     bgClr="#7E98DF" 
                     ftClr="white" 
                     val="Send"
                  />
               </div>
            </form>
            :
            <form onSubmit={ (e) => { setNewPassword(e) } } style={{textAlign: "center"}}>
               <div className={"displayRow " + css.authBigTitle}>
                  <div className="hoverThis" onClick={ () => { router.push("/login") } }>{"<"}</div>
                  <div style={{textAlign: "center", width: "100%"}}>Forgot Password</div>
               </div>
               <div className={css.authSmallTitle}>Type your new password</div>
               <Input
                  ipCg={ (e) => { setPasswordChange(e) } }
                  ipLbl="New password" 
                  ipNm="newPassword"
                  ipTy="password" 
                  plcHldr="Input your new password here" 
                  val={resetPassword.newPassword}
               />
               <Input
                  ipCg={ (e) => { setPasswordChange(e) } }
                  ipLbl="Retype password" 
                  ipNm="retypePassword"
                  ipTy="password" 
                  plcHldr="Retype your new password here" 
                  val={resetPassword.retypePassword}
               />
               <div className={css.gapBetweenInputAndRegister}>
                  <BigButton 
                     bgClr="#7E98DF" 
                     ftClr="white" 
                     val="Reset"
                  />
               </div>
            </form>
            }
         </div>
      </div>
   )
}