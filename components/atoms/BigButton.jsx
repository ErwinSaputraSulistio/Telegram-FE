import css from '../../styles/css/components/atoms.module.css'

export default function Button({ bgClr, brdr, ftClr, icon, val }) {
   return(
      <button 
      className={"displayRow hoverThis " + css.bigBtn}
      style=
      {{
         alignItems: "center",
         background: bgClr, 
         border: brdr,
         color: ftClr, 
         justifyContent: "center", 
         width: "100%"
      }}
      >
         { icon !== undefined ? <img className={css.bigBtnLogo} src={icon}/> : null }
         <div>{val}</div>
      </button>
   )
}