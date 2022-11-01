import React, { useState, useEffect } from 'react'
import {Console, Decode, Hook, Unhook} from 'console-feed'
import styles from './styles.module.css';

export class LogContainer extends React.Component {
    state = {
        logs: [],
    }

    componentDidMount() {
        Hook(window.console, (log) => {
            if (log[0].method === 'clear') {
                this.setState(() => ({ logs : [] }))
            } else {
                this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
            }
        }, true, 100)
    }

    render() {
        return (
            <div className={styles.console} style={{backgroundColor: 'black'}}>
                <Console logs={this.state.logs} variant="dark" />
            </div>
        )
    }
}
