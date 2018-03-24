import React, { Component } from "react";
import { observer, inject } from "mobx-react";

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
        return (
            <div>
                
            </div>
        )
    }
}

export default inject("store")(observer(PendingLists));
