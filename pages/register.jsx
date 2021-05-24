import css from '../styles/css/pages/register.module.css'
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
   // REGISTER FUNCTION
   const [inputData, setInputData] = useState({name: "", password: ""})
   const inputChange = (e) => { setInputData({...inputData, [e.target.name] : e.target.value}) }
   const registerRequest = (e) => {
      e.preventDefault()
      const registerData = { name: inputData.name, email: inputData.email, password: inputData.password }
      if(inputData.name.length < 6 || inputData.name.length > 30) { Swal.fire("Gagal?!", "Membatalkan proses registrasi akun baru, nama user terlalu pendek atau kepanjangan!", "error") }
      else if(passwordStrength < 1) { Swal.fire("Gagal?!", "Membatalkan proses registrasi akun baru, password terlalu lemah!", "error") }
      else {
         axios.post(process.env.SERVER + "/user", registerData)
         .then((res) => {
            Swal.fire("Selesai!", res.data.outputData.message, "success")
            .then(() => { router.push("/login") })
         })
         .catch((err) => { Swal.fire("Gagal?!", err.response.data.errorMessage, "error") })
      }
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
   // PASSWORD STRENGTH CHECKER CONF
   const pw = inputData.password
   const [lengthInPW, setLengthInPW] = useState(false)
   const [capitalInPW, setCapitalInPW] = useState(false)
   const [numberInPW, setNumberInPW] = useState(false)
   const twoFactorInPW = [capitalInPW, numberInPW]
   const checkAnyCapitalInPassword = (pass) => { return /[A-Z]/.test(pass) }
   const checkAnyNumberInPassword = (pass) => { return /[0-9]/.test(pass) }
      // SET TRUE FALSE FOR EACH VALIDATION (CAPITAL & NUMBER)
   const setPasswordStrength = (pass) => {
      // IF CONDITIONS ARE MET (true)
      pass.length >= 8 && setLengthInPW(true)
      checkAnyCapitalInPassword(pass) === true && setCapitalInPW(true)
      checkAnyNumberInPassword(pass) === true && setNumberInPW(true)
      // IF CONDITIONS ARE NOT MET (false)
      pass.length < 8 && setLengthInPW(false)
      checkAnyCapitalInPassword(pass) === false && setCapitalInPW(false)
      checkAnyNumberInPassword(pass) === false && setNumberInPW(false)
   }
   const passwordChange = (e) => {
      setInputData({...inputData, [e.target.name] : e.target.value})
      setPasswordStrength(e.target.value)
   }
   const passwordStrength = twoFactorInPW.filter((value) => value).length
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
               <div className={css.nameTooShortOrLongText} style={inputData.name === "" ? {visibility: "hidden"} : null}>
                  {
                  inputData.name.length < 6 ? <span style={{color: "indianred"}}>Name is too short</span>
                  :
                  inputData.name.length > 30 ? <span style={{color: "indianred"}}>Name is too long</span>
                  :
                  <span style={{color: "#3CB371"}}>You can use this name</span>
                  }
               </div>
               <Input
                  ipCg={ (e) => { inputChange(e) } }
                  ipLbl="Email" 
                  ipNm="email"
                  ipTy="email" 
                  plcHldr="Input your email here"
                  val={inputData.email}
               />
               <Input
                  ipCg={ (e) => { passwordChange(e) } }
                  ipLbl="Password"
                  ipNm="password"
                  ipTy="password" 
                  plcHldr="Input your password here"
                  val={pw} 
               />
               <div className={"displayRow " + css.passwordStrengthZone} style={ 
                  pw === "" ? {visibility: "hidden"}
                  :
                  null
               }>
                  <div 
                     style={
                        lengthInPW === true && passwordStrength === 0 ? {background: "indianred"}
                        :
                        lengthInPW === true && passwordStrength === 1 ? {background: "yellow"}
                        :
                        lengthInPW === true && passwordStrength === 2 ? {background: "#3CB371"}
                        :
                        null
                     }
                     className={css.passwordStrengthBorder}
                  />
                  <div 
                     style={
                        lengthInPW === true && passwordStrength === 1 ? {background: "yellow"}
                        :
                        lengthInPW === true && passwordStrength === 2 ? {background: "#3CB371"}
                        :
                        null
                     }
                     className={css.passwordStrengthBorder}
                  />
                  <div 
                     style={lengthInPW === true && passwordStrength === 2 ? {background: "#3CB371"} : null} 
                     className={css.passwordStrengthBorder}
                  />
               </div>
               <div className={css.passwordStrengthText} style={ 
                  pw === "" ? {visibility: "hidden"}
                  :
                  null
               }>
                  Password strength : 
                  <span style={{color: "#9F9F9F"}}>
                     {
                     lengthInPW === true && passwordStrength === 0 ? " Weak"
                     :
                     lengthInPW === true && passwordStrength === 1 ? " Normal"
                     :
                     lengthInPW === true && passwordStrength === 2 ? " Strong (recommended)"
                     :
                     " Too short"
                     }
                  </span>
               </div>
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