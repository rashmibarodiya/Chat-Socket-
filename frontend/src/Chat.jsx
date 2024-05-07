import { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"
import { io } from "socket.io-client"

function Chat(){

    const [mes, setMes] = useState("")
    const [allMsg, setAllMsg] = useState([])

    const socket = io(`https://effective-space-couscous-v6p5jgwrg7x42wx56-5173.app.github.dev/`)

    // Send message
    const sendMsg = () => {
        socket.emit("userMsg", mes)
        // Clear the message later if needed
        setMes("")
        console.log(":::::::::::::;;::")
    }

    // Receive messages
    useEffect(() => {
        const messageHandler = (msg) => {
            setAllMsg((prevMsgs) => [...prevMsgs, msg]);
        };
        socket.on('message', messageHandler);
        return () => {
            socket.off('message', messageHandler);
        };
    }, [socket]);
    

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10
            }}>
                <TextField
                    onChange={(e) => {
                        setMes(e.target.value)
                    }}
                    fullWidth
                    id="outlined-basic"
                    label="Enter message"
                    variant="outlined"
                />

                <Button 
                    onClick={sendMsg} // Corrected onClick event handler
                    
                >
                    Send
                </Button>
            </div>
           
            <div>
                {
                    allMsg.map((msg, idx) => (
                        <p key={idx}>{msg}</p>
                    
                    ))
                    
                }
                 <div>jdfjdgjkkdjsfjdf</div>
            </div>
        </div>
    )
}

export default Chat
