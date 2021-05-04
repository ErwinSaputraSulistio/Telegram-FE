import { useState } from 'react'
import css from '../../styles/css/components/atoms.module.css'
import Eye from '../../img/eye.png'

export default function Input({ipCg, ipLbl, ipNm, ipTy, plcHldr, val}) {
   // INPUT FUNCTION
   const [showPassword, changeShowPassword ] = useState(false)
   // RETURN
   return(
      <div>
         { ipLbl !== undefined ? <div className={css.inputLabel}>{ipLbl}</div> : null }
         <div className={"displayRow " + css.inputZone}>
            <input 
               className={css.inputBaseSize}
               name={ipNm}
               onChange={ipCg}
               placeholder={plcHldr}
               required
               type={ipTy === "password" && showPassword === true ? "text" : ipTy}
               value={val}
            />
            { ipTy === "password" ? <img className={"hoverThis " + css.eyeBtnSize} src={Eye} onClick={ () => { changeShowPassword(!showPassword) } }/> : null }
         </div>
      </div>
   )
}