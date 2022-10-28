import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'

const LogsContainer = () => {
    const [logs, setLogs] = useState([])

    // run once!
    useEffect(() => {
        Hook(window.console, log => setLogs(currLogs => [...currLogs, log]), false)
        return () => Unhook(window.console)
    }, [])

    return <div style={{width: "100%", backgroundColor: "black"}}>
        <Console logs={logs} variant="dark" />
    </div>
}

export { LogsContainer }
