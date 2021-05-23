import css from '../../../styles/css/components/molecules.module.css'
import InDevelopmentGIF from '../../../public/img/inDevelopment.gif'
import { useEffect, useState } from 'react'

export default function InDevelopment() {
   const [dotAnimate, setDotAnimate] = useState("")
   const [dotCount, setDotCount] = useState(0)
   useEffect(() => { setDotCount(1) }, [])
   useEffect(() => {
      function increment() {
         const dot = "  .  "
         if(dotCount >= 3) { 
            setDotAnimate(dot.repeat(dotCount))
            setDotCount(0)
         }
         else { 
            setDotAnimate(dot.repeat(dotCount))
            setDotCount(dotCount + 1)
         }
      }
      const interval = setInterval(increment, 500)
      return () => clearInterval(interval)
   }, [dotCount])
   return(
      <div className={"displayColumn " + css.inDevelopment}>
         <div>In Development {dotAnimate}</div>
         <img className={css.inDevelopmentAnimation} src={InDevelopmentGIF}/>
      </div>
   )
}