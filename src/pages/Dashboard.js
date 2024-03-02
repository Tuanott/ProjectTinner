import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import logoutlogo from '../images/logoutlogo.png'
import messagelogo from '../images/messagelogo.png'
import profilelogo from '../images/profilelogo.png'


const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
        
    }

    const userId = cookies.UserId


    const getUser = async () => {
        try {
            const response = await axios.get('https://52.65.52.76:8000/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('https://52.65.52.76:8000/gendered-users', {
                params: {gender: user?.gender_interest}
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('https://52.65.52.76:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }

    const navigate = useNavigate()

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }
    
    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))
    

    console.log('filteredGenderedUsers ', filteredGenderedUsers)

    return (
        <>
            {user &&
            <div>
                <div className="upperdashboard">
                
                </div>
                <div className="dashboard">
                    
                    

                    
                    <div className="swipe-container">

                    
                        <div className="card-container">
                            {filteredGenderedUsers?.map((genderedUser) =>
                                <TinderCard
                                    className="swipe"
                                    key={genderedUser.user_id}
                                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                    <div
                                        style={{backgroundImage: "url(" + genderedUser.url + ")"}}
                                        className="card">
                                            
                            
                                        <div class="box">
                                            <h3>{genderedUser.first_name}</h3>
                                            <h4>{genderedUser.about}</h4>
                                        </div>
                                    </div>
                                </TinderCard>
                            )}
                            
                            
                        </div>
                        <div classsName="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div> 
                        <div className='grid-containerdash'>
                        <img src={logoutlogo} alt="logoutlogo" width="64px" height="64px" onClick={logout} />
                        <img src={messagelogo} alt="messagelogo" width="64px" height="64px" onClick={() => navigate('/chatboard')} />
                        <img src={profilelogo} alt="profilelogo" width="64px" height="64px"  />
                        
                        </div>
                        
                    </div>
                </div>
             </div>}
        </>
    )
    
}

export default Dashboard