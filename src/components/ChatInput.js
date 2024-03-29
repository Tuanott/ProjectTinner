import { useState} from 'react'
import axios from 'axios'
import sendlogo from '../images/sendlogo.png'
const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }

        try {
            await axios.post('http://52.65.52.76:8000/message', { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }


    return (
            <div className="chat-input">
                
                <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
                

                 <img src={sendlogo} alt="sentlogo" width="50px" height="50px" onClick={addMessage} />
               
                
            </div>
            
    )
}

export default ChatInput