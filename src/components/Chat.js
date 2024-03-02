const Chat = ({descendingOrderMessages}) => {
    return (
        <>
            <div className="chat-display">
                {descendingOrderMessages.map((message, _index) => (
                    <div key={_index}>
                        <div className="chat-message-header">
                            <div className="grid-container">
                                <div className="grid-container2">
                                    <div className="img-container">
                                        <img src={message.img} alt={message.name + ' profile'}/>
                                    </div>   
                                      
                                        <p>{message.name}</p>
                                   
                                </div>
                                <div className="grid-container3">
                                    
                                    <p>{message.message}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Chat