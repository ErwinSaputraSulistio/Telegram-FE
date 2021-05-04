import css from '../styles/css/pages/register.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import Swal from 'sweetalert2'
// LOGO
import Google from '../img/google.png'
// ATOMS
import Input from '../components/atoms/Input'
import BigButton from '../components/atoms/BigButton'

export default function Login() {
   // CONF
   const router = useRouter()
   // REGISTER FUNCTION
   const [inputData, setInputData] = useState({})
   const inputChange = (e) => { setInputData({...inputData, [e.target.name] : e.target.value}) }
   const registerRequest = (e) => {
      e.preventDefault()
      const registerData = { name: inputData.name, email: inputData.email, password: inputData.password }
      axios.post(process.env.SERVER + "/user", registerData)
      .then((res) => {
         Swal.fire("Selesai!", res.data.outputData.message, "success")
         .then(() => { router.push("/login") })
      })
      .catch((err) => { Swal.fire("Gagal?!", err.response.data.errorMessage, "error") })
   }
   useEffect(() => {
      if(localStorage.getItem("loginUserName") !== null) { 
         Swal.fire(
            "Hmm, kamu sekarang masih login lho?!", 
            localStorage.getItem("loginUserName") + ", kalau ingin membuat akun baru harap logout terlebih dahulu!", 
            "question")
         .then(() => { router.push("/") }) 
      }
   }, [])
   // RETURN
   return(
      <div className={"authBg displayRow"}>
         <Head>
            <title>Telegram - Register</title>
         </Head>
         <div className="authBorder displayColumn showInAnimation">
            <form onSubmit={ (e) => { registerRequest(e) } } style={{textAlign: "center"}}>
               <div className={"displayRow " + css.authBigTitle}>
                  <div className="hoverThis" onClick={ () => { router.push("/login") } }>{"<"}</div>
                  <div style={{textAlign: "center", width: "100%"}}>Register</div>
               </div>
               <div className={css.authSmallTitle}>Let's create your account!</div>
               <Input
                  ipCg={ (e) => { inputChange(e) } }
                  ipLbl="Name"
                  ipNm="name"
                  ipTy="text" 
                  plcHldr="Input your name here"
                  val={inputData.name} 
               />
               <Input
                  ipCg={ (e) => { inputChange(e) } }
                  ipLbl="Email" 
                  ipNm="email"
                  ipTy="email" 
                  plcHldr="Input your email here"
                  val={inputData.email}
               />
               <Input
                  ipCg={ (e) => { inputChange(e) } }
                  ipLbl="Password"
                  ipNm="password"
                  ipTy="password" 
                  plcHldr="Input your password here"
                  val={inputData.password} 
               />
               <div className={css.gapBetweenInputAndRegister}>
                  <BigButton 
                     bgClr="#7E98DF" 
                     ftClr="white" 
                     val="Register"
                  />
               </div>
            </form>
            <div className={"displayRow gapBetweenButtonAndGoogle"}>
               <div className="lineBreak"/>
               <div className="lineBreakText">Or register with</div>
               <div className="lineBreak"/>
            </div>
            <BigButton 
               bgClr="white"
               brdr="1px solid #7E98DF"
               ftClr="#7E98DF"
               icon={Google}
               val="Google"
            />
         </div>
      </div>
   )
}