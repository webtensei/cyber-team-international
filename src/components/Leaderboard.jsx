import React, {useCallback, useRef, useState} from 'react';
import UserBar from "./UserBar";
import {users} from "../utils/UserCreate";
import {useVirtualization} from "../hooks/useVirtualization";
import {createUseStyles} from "react-jss";

const Leaderboard = () => {
    const [userData, setUserData] = useState([...users])
    const scrollElementRef = useRef(null);
    const itemHeight = 79
    const {isScrolling, virtualItems, totalHeight} = useVirtualization({
        itemHeight: itemHeight,
        itemsCount: userData.length,
        overscan: 15,
        getScrollElement: useCallback(() => scrollElementRef.current, []),
    });


    const useStyles = createUseStyles({
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            font: {
                size: 40,
                weight: 900
            },
        },
        link: {
            "&:hover": {
                opacity: 0.5
            }
        },
        tableParrent: {
            overflow: 'auto',
            height: '90vh',
            position: 'relative'
        },
        tableScrollGen:{
            height: itemHeight * userData.length
        },


    })
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <h1>Таблица лидеров</h1>
            <div className={classes.tableParrent} ref={scrollElementRef}>
                <div className={classes.tableScrollGen}>
                    {virtualItems && virtualItems.map((virtualItem, index) => {
                        const item = userData[virtualItem.index]
                        return (
                            <div style={{
                                position: index === 0 ? '' : 'absolute',
                                top: 0,
                                transform: `translateY(${virtualItem.offsetTop}px)`,
                                height: itemHeight,
                            }}>
                                < UserBar
                                    user={item}
                                    virtualOffset={virtualItem.offsetTop}
                                    rank={virtualItem.index}
                                    key={index}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;