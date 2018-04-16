import React from 'react';
import PropTypes from 'prop-types';
import './Template.css';

const ItemsTemplate = ({fields}) => {
        const {shipLength, shipPart} = fields;
    return <div style={{width: 100*shipLength/5+'%', right:shipPart*22+'%'}} className={'shipPreview'}/>;
};

ItemsTemplate.propTypes = {
    fields: PropTypes.object
};

export default ItemsTemplate;