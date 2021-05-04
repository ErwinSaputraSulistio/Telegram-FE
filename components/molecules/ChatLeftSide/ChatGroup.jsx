import css from '../../../styles/css/components/molecules.module.css'
import ChatBox from '../../atoms/ChatLeftSide/ChatBox'

export default function ChatGroup({ del, passDatasFromOrganisms, passFuncsFromOrganisms }) {
   return(
      <div className={"displayColumn " + css.chatGroup}>
         { passDatasFromOrganisms.map((item) => 
            { 
            return <ChatBox
                  del={del}
                  func={passFuncsFromOrganisms} 
                  image={item.connection_data.user_image} 
                  name={item.connection_data.real_name}
                  unique={item.connection_data.connection_id}
                  userid={item.connection_data.user_id}
               /> 
            }) 
         }
      </div>
   )
}