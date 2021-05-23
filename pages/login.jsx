import css from '../styles/css/pages/login.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import Swal from 'sweetalert2'
// LOGO
import Google from '../public/img/google.png'
// ATOMS
import Input from '../components/atoms/Input'
import BigButton from '../components/atoms/BigButton'

export default function Login() {
   // CONF
   const router = useRouter()
   // LOGIN FUNCTION
   const [inputData, setInputData] = useState({})
   const inputChange = (e) => { setInputData({...inputData, [e.target.name] : e.target.value}) }
   const loginRequest = (e) => {
      e.preventDefault()
      const loginData = { email: inputData.email, password: inputData.password }
      axios.post(process.env.SERVER + "/user/login", loginData)
      .then((res) => {
         localStorage.setItem("jwtToken", res.data.outputData.jwtToken)
         localStorage.setItem("userId", res.data.outputData.user_id)
         localStorage.setItem("loginUserName", res.data.outputData.real_name)
         Swal.fire("Berhasil login!", "Selamat datang, " + res.data.outputData.real_name + "!", "success")
         .then(() => { router.push("/chat") })
      })
      .catch((err) => { Swal.fire("Gagal login?!", err.response.data.errorMessage, "error") })
   }
   useEffect(() => {
      if(localStorage.getItem("loginUserName") !== null) { 
         Swal.fire("Login lagi?!", "Anda sudah login " + localStorage.getItem("loginUserName") + ", jika ingin mengganti akun harap logout terlebih dahulu!", "question")
         .then(() => { router.push("/chat") }) 
      }
   }, [])
   // RETURN
   return(
      <div className={"authBg displayRow"}>
         <Head>
            <title>Telegram - Login</title>
         </Head>
         <div className="authBorder displayColumn showInAnimation">
            <form onSubmit={ (e) => { loginRequest(e) } } style={{textAlign: "center"}}>
               <div className={css.authBigTitle}>Login</div>
               <div className={css.authSmallTitle}>Hi, welcome back!</div>
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
               <div className={css.forgotPassword}><span className="hoverThis" onClick={ () => { router.push("/forgot-password") } }>Forgot password?</span></div>
               <BigButton 
                  bgClr="#7E98DF" 
                  ftClr="white" 
                  val="Login"
               />
            </form>
            <div className="displayRow gapBetweenButtonAndGoogle">
               <div className="lineBreak"/>
               <div className="lineBreakText">Or login with</div>
               <div className="lineBreak"/>
            </div>
            <BigButton 
               bgClr="white"
               brdr="1px solid #7E98DF"
               ftClr="#7E98DF"
               icon={Google}
               val="Google"
            />
            <div className={css.dontHaveAnAccount}>
               Don't have an account? <span className={"hoverThis " + css.signUp} onClick={ () => { router.push("/register") } }>Register</span>
            </div>
         </div>
      </div>
   )
}