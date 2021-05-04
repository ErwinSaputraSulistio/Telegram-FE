import css from '../../../styles/css/components/molecules.module.css'

export default function Back({func, name}) {
   return(
      <div className={"displayRow " + css.back} style={{alignItems: "center", justifyContent: "space-between"}}>
         <div className="hoverThis" onClick={func}>{"<"}</div>
         <div style={{textAlign: "center", width: "100%"}}>{name}</div>
      </div>
   )
}