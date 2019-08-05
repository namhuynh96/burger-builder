import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import classes from './Modal.module.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps.show);
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
    }
    componentWillUpdate() {
        //console.log('[Modal] will update')
    }
    render() {
        return (
            <Aux>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>
                <Backdrop clicked={this.props.backdropClicked} show={this.props.show}></Backdrop>
            </Aux>
        );
    }
} 

export default Modal;
