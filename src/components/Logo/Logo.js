import React from 'react';

import classes from './Logo.module.css';
import logoImage from '../../assets/images/burger-logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={logoImage} alt='burger-logo'/>
    </div>
);

export default logo;