import React from 'react';
import './item.css';

export default ({name, img, description, price,currency, location}) => (
    <div className="card">
        <div className="card-image">
            <figure className="image is-4by3">
                <img src={img} alt={name} />
            </figure>
        </div>
        <div className="card-content">
            <div className="media">
                <div className="media-content">
                    <p className="title is-6">{name}</p>                    
                </div>
                <div className="media-right">
                    <p className="price">
                        {price}                        
                        <i className={`fa fa-${currency}`} style={{marginLeft: '2px'}}></i>             
                    </p>                          
                </div>
            </div>

            <div className="content">
                <p>{description}</p>                
            </div>            
        </div>
        <footer className="item-footer">
            <p className="location" >
                <i className="fa fa-map-marker" style={{marginRight: '3px'}}></i>
                {location}
            </p>
        </footer>
    </div>
)