import Head from 'next/head'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Verify() {
   const router = useRouter()
   const { id } = router.query
   useEffect(() => {
      axios.get(process.env.SERVER + "/user/verify/" + id)
      .then((res) => {
         Swal.fire("Verifikasi akun sukses ~", res.data.outputData, "success")
         .then(() => { router.push("/login") })
      })
      .catch((err) => {
         Swal.fire("Verifikasi akun gagal ~", err.response.data.jwtError, "error")
         .then(() => { router.push("/login") })
      })
   }, [id])
   return(
      <div className={"authBg displayRow showInAnimation"}>
         <Head><title>Telegram - Verification</title></Head>
      </div>
   )
}