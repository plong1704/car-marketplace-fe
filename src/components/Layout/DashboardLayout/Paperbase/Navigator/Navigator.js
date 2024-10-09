import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import ViewListIcon from '@mui/icons-material/ViewList';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import config from "~/config";

const categories = [
    {
        id: 'Build',
        children: [
            {
                id: 'Orders',
                icon: <ViewListIcon/>,
                active: true,
                link: config.routes.managerOrder
            },
            {
                id: 'Users',
                icon: <PeopleIcon/>,
                link: config.routes.managerUser
            },
            {id: 'Products', icon: <DnsRoundedIcon/>, link: config.routes.managerProduct},
            {id: 'Hosting', icon: <PublicIcon/>},
            {id: 'Functions', icon: <SettingsEthernetIcon/>},
            {
                id: 'Machine learning',
                icon: <SettingsInputComponentIcon/>,
            },
        ],
    },
    {
        id: 'Quality',
        children: [
            {id: 'Analytics', icon: <SettingsIcon/>},
            {id: 'Performance', icon: <TimerIcon/>},
            {id: 'Test Lab', icon: <PhonelinkSetupIcon/>},
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const {...other} = props;
    const [change, setChange] = useState(false)
    const {t} = useTranslation()
    const setActive = (index) => {
        categories[0].children.map(item => {
            item.active = false
        })
        categories[0].children[index].active = true
        if (change === true)
            setChange(false)
        else
            setChange(true)
    }

    useEffect(() => {
    }, [change])

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <Link to={config.routes.home}>
                    <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
                        {t("db-homeucar")}
                    </ListItem>
                </Link>
                <ListItem sx={{...item, ...itemCategory}}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText>{t("db-home")}</ListItemText>
                </ListItem>
                {categories.map(({id, children}) => (
                    <Box key={id} sx={{bgcolor: '#101F33'}}>
                        <ListItem sx={{py: 2, px: 3}}>
                            <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, active, link}, index) => (
                            <Link key={childId} to={link}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        setActive(index)
                                    }} selected={active} sx={item}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{childId}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}

                        <Divider sx={{mt: 2}}/>
                    </Box>
                ))}
            </List>
        </Drawer>
    )
}
