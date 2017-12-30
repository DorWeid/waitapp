import React, { Component } from 'react';

class UserLists extends Component {
    render() {
        const { match: { params: {user: name}} } = this.props;        
        return (
            <div>
                Hey {name} thats the lits
            </div>
        )
    }
}

export default UserLists;