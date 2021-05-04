import css from '../../../styles/css/components/molecules.module.css'

export default function ChatSort({ passFuncsFromOrganisms }) {
   return(
      <div className={"displayRow " + css.sortArea} style={{alignItems: "center", justifyContent: "space-between"}}>
         <div 
            className={"hoverThis " + css.sortBtn} 
            onClick={ passFuncsFromOrganisms[1] } 
            style={ 
               passFuncsFromOrganisms[0] === "All" ? 
               { background: "#7E98DF", color: "white" } 
               : 
               null 
            }
         >All</div>
         <div 
            className={"hoverThis " + css.sortBtn} 
            onClick={ passFuncsFromOrganisms[2] } 
            style={ 
               passFuncsFromOrganisms[0] === "Important" ? 
               { background: "#7E98DF", color: "white" } 
               : 
               null
            }
         >Important</div>
         <div 
            className={"hoverThis " + css.sortBtn} 
            onClick={ passFuncsFromOrganisms[3] } 
            style={ 
               passFuncsFromOrganisms[0] === "Unread" ? 
               { background: "#7E98DF", color: "white" } 
               : 
               null 
            }
         >Unread</div>
      </div>
   )
}