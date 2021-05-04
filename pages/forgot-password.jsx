import css from '../styles/css/pages/forgotPassword.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Swal from 'sweetalert2'
// ATOMS
import Input from '../components/atoms/Input'
import BigButton from '../components/atoms/BigButton'

export default function ForgotPassword() {
   // CONF
   const router = useRouter()
   useEffect(() => {
      if(localStorage.getItem("loginUserName") !== null) { 
         Swal.fire("Ups, ada apa nih?!", localStorage.getItem("loginUserName") + ", jika ingin reset password akun lain harap logout terlebih dahulu!", "question")
         .then(() => { router.push("/chat") }) 
      }
   }, [])
   // RETURN
   return(
      <div className={"authBg displayRow"}>
         <Head>
            <title>Telegram - Forgot Password</title>
         </Head>
         <div className="authBorder displayColumn showInAnimation">
            <form style={{textAlign: "center"}}>
               <div className={"displayRow " + css.authBigTitle}>
                  <div className="hoverThis" onClick={ () => { router.push("/login") } }>{"<"}</div>
                  <div style={{textAlign: "center", width: "100%"}}>Forgot Password</div>
               </div>
               <div className={css.authSmallTitle}>You’ll get messages soon on your e-mail</div>
               <Input
                  ipLbl="Email" 
                  ipTy="email" 
                  plcHldr="Input your email here" 
               />
               <div className={css.gapBetweenInputAndRegister}>
                  <BigButton 
                     bgClr="#7E98DF" 
                     ftClr="white" 
                     val="Send"
                  />
               </div>
            </form>
         </div>
      </div>
   )
}