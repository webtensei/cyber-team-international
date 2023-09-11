import React, { useLayoutEffect, useRef, useState} from 'react';
import {createUseStyles} from "react-jss";
import helmet from '../assets/helmet.svg'
import {dateTransfer} from "../utils/millisecondsConverter";

const UserBar = ({user, rank}) => {
    const [isClicked, setClicked] = useState(false)
    const imageRef = useRef(null)

    const userColor = ['#f44336', '#5eba7d', '#5799e4']
    const createStyles = createUseStyles({
        wrapper: {
            width: 320,
            marginBottom: 15,
            cursor: 'pointer',
            zIndex:9999,
            '&:hover': {
                backgroundColor: '#f1f1f1'
            }
        },
        userContent: {
            display: "flex",
            alignItems: 'center',
            justifyContent:'center'
        },
        rank: {
            width:'35px',
            textAlign:'right',
            fontWeight: 'bolder'
        },
        userImage: {
            backgroundColor: 'inherit',
            marginRight:10,
            marginLeft:10,
            height: 62,
            width: 62,
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background 1s',
            '& img': {
                height: 56,
                width: 56,
                backgroundColor:'white',
                borderRadius:50
            }
        },
        rankingInfo: {
            color: '#9690ea',
            display: 'flex',
            flexDirection: 'row',
            '& p': {
                margin: 0
            },
            '& #userSpeed': {
                marginLeft: 2,
                color: userColor[user.color]
            }
        },
        userShortInfo: {
            display: 'flex',
            flexDirection: 'column',
            fontWeight: '400',
            '& #userName': {
                width: 190,
                margin:0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        },
        penaltyTime: {
            color: 'gray'
        }
    });
    const styles = createStyles()


    useLayoutEffect(() => {
        (isClicked) ? imageRef.current.style.backgroundColor = '#9690ea' : imageRef.current.style.backgroundColor = 'inherit'
    }, [isClicked])
    return (
        <div className={styles.wrapper} onClick={() => {
            setClicked((isClicked) => !isClicked)
        }}>
            <div className={styles.userContent}>
                <div className={styles.rank}>
                    {rank + 1}
                </div>
                <div className={styles.userImage} ref={imageRef}>
                        <img alt="avatar" src={helmet}/>
                </div>
                <div className={styles.userShortInfo}>
                    <p id="userName">{user.name}</p>
                    <div className={styles.rankingInfo}>
                        <p>{dateTransfer(user.time)} </p> <p id="userSpeed">I {user.speed} км/ч</p>
                    </div>
                    <div className={styles.penaltyTime}>штрафное время 00:00:00</div>
                </div>
            </div>
        </div>

    );
};

export default UserBar;