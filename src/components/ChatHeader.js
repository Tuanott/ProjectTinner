import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import backlogo from '../images/backlogo.png'

const ChatHeader = ({ user }) => {
    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    
    const navigate = useNavigate()

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
        
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photo of " + user.first_name} />
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <img src={backlogo} alt="backlogo" className="log-out-icon" width="40px" height="40px" onClick={() => navigate('/Dashboard',{replace: true})} />
        </div>
    )
}

export default ChatHeader