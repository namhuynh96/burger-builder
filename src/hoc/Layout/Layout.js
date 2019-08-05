import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {


    state = {
        openSideDrawer: false,
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {openSideDrawer: !prevState.openSideDrawer}
        });
    }

    closeSideDrawerHandler = () => {
        this.setState({
            openSideDrawer: false,
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.toggleSideDrawerHandler} />
                <SideDrawer
                    open={this.state.openSideDrawer}
                    backdropClicked={this.closeSideDrawerHandler}
                    showBackdrop={this.state.openSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;