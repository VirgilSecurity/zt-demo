import React, { useState, useEffect } from 'react'
import {Console, Decode, Hook, Unhook} from 'console-feed'
import styles from './styles.module.css';

export class LogContainer extends React.Component {
    state = {
        clientLogs: [],
        KycLogs: [],
        BackendLogs: []
    }

    componentDidMount() {
        Hook(window.console, (log) => {
            if (log[0].method === 'clear') {
                this.setState(() => ({ clientLogs : [] , KycLogs: [], BackendLogs: []}))
            } else {
                switch (log[0].data[0]) {
                    case 'KYC': {
                        this.setState((prevState) => ({ ...prevState, KycLogs: [...prevState.KycLogs, Decode(log)] }))
                        break;
                    }
                    case 'Backend': {
                        this.setState((prevState) => ({ ...prevState, BackendLogs: [...prevState.BackendLogs, Decode(log)] }))
                        break;
                    }
                    default:
                        this.setState((prevState) => ({ ...prevState, clientLogs: [...prevState.clientLogs, Decode(log)] }))
                }
            }
        }, true, 100)
    }

    render() {
        return (
            <div>
                <div className={styles.console} style={{backgroundColor: 'black'}}>
                    <h2 style={{color: 'white'}}>Client logs:</h2>
                    <Console logs={this.state.clientLogs} variant="dark" />
                </div>
                <div className={styles.leftConsole} style={{backgroundColor: 'black'}}>
                    <h2 style={{color: 'white'}}>KYC websocket</h2>
                    <Console logs={this.state.KycLogs} variant="dark" />
                </div>
                <div className={styles.rightConsole} style={{backgroundColor: 'black'}}>
                    <h2 style={{color: 'white'}}>Backend websocket:</h2>
                    <Console logs={this.state.BackendLogs} variant="dark" />
                </div>
            </div>
        )
    }
}
