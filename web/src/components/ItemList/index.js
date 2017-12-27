import React from 'react';
import Item from '../Item';
import './itemlist.css';

export default ({items}) => (
    <div className="item-list">
        {items.map(item => <Item key={item.name} {...item}/>)}
    </div>
)