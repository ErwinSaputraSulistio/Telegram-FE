import css from '../../../styles/css/components/atoms.module.css'

export default function HamMenuBtn({ cstmcls, func, icon, mgTp, mgBtm, text }) {
   return(
      <div className="displayRow hoverThis" onClick={func} style={{alignItems: "center", background: "transparent", marginTop: mgTp, marginBottom: mgBtm}}>
         <div className={"displayRow " + css.hamMenuBtnIcon}><img className={cstmcls} src={icon}/></div>
         <div className={css.hamMenuBtnText}>{text}</div>
      </div>
   )
}