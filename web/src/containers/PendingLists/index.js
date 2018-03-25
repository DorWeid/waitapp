import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {Redirect} from 'react-router';

class PendingLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pendingLists: []
        };
    }
    componentDidMount() {
        const {store: {userStore}} = this.props;
        this.setState({pendingLists: userStore.currentUser.getPendingLists()});
    }

    render(){ 
        const {store: {userStore}} = this.props;
        console.log('sg', userStore.currentUser.email)
        if (!userStore.currentUser.admin) {
            return (<Redirect to="/"/>);
        }
        return (
            <div>
                Shut
            </div>
        )
    }
}

export default inject("store")(observer(PendingLists));
