import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    return (
        <Aux>
            <Backdrop clicked={props.backdropClicked} show={props.showBackdrop}></Backdrop>
            <div className={[classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;