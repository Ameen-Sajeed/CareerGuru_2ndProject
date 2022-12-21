import {createContext} from 'react'
import {io} from 'socket.io-client'

// export const socket = io('http://localhost:8800')
export const socket = io(process.env.REACT_APP_SOCKET_URL,
    {path: '/socket/socket.io'})
export const SocketContext = createContext();