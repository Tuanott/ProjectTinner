import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
import {useCookies} from "react-cookie"
import logo from '../images/Tinnerlogo.png'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            
            <div className="home">
                
                <img src={logo} alt="Logo" width="300px" height="120px" />
                
                <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>
            


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    )
}
export default Home