import React, { forwardRef } from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
// import "./../../public/CSS/Message";
import './Message.css'



const Message = forwardRef(({ message, username }, ref) => { //We are wrapping everything in forwardRef

    const isUser = username === message.user;  //if username is same who is sending the message
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                        color="white"
                        variant="h5"
                        component="h2" >
                        {!isUser && `${message.user || 'Unknown User'} : `}  {message.text}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    )
})

export default Message;