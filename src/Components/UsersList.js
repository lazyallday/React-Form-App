import React, { Component } from 'react';
import EditForm from './EditForm';

import img_del from '../img/del.png';
import img_edit from '../img/edit.png';

/** Styling icons **/
var editStyle = {
    backgroundImage: 'url(' + img_edit + ')',
    width: 24,
    height: 24,

}
var delStyle = {
    backgroundImage: 'url(' + img_del + ')',
    width: 24,
    height: 24,
    'margin-left': 25,
    'margin-right': 25
}

export class UsersList extends Component {
    constructor(props) {
        super(props);
        this.onClickSort = this.onClickSort.bind(this);

        this.onClickDel = this.onClickDel.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.createUserNode = this.createUserNode.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.state = { userId: [] }
    }

    onClickSort(e, key) {
        this.props.sortUser(key);

        e.preventDefault();

        /*
        var icon = '';
        switch (key) {
        default:
        return 0;
        case 'name':
            icon = e.target;
            console.log(icon.value);
            icon.value = "&#8595;";
        } */
    }

    onClickDel(user) {
        this.props.remove(user);
    }

    onClickEdit(_user) {
        this.setState((prevState) => {
            return {
                userId: prevState.userId.concat(_user.id)
            }
        });
    }

    updateUser(_user) {
        this.setState((prevState) => {
            return {
                userId: prevState.userId.filter(x => x !== _user.id)
            }
        });
        this.props.updateUser(_user);
    }

    cancelEdit(_user) {
        this.setState((prevState) => {
            return {
                userId: prevState.userId.filter(x => x !== _user.id)
            }
        });
    }

    createUserNode(_user) {
        if (this.state.userId.includes(_user.id)) {
            return (
                <div key={_user.id}>
                    <EditForm update={this.updateUser} user={_user} cancel={this.cancelEdit}></EditForm>
                </div>
            )
        }
        return (
            <li key={_user.id}>
                <div className="row">
                    <div className="name">{_user.name}</div>
                    <div className="email">{_user.email}</div>
                    <div className="phone">{_user.phone}</div>
                    <div className="buttonIcon">
                        <button style={editStyle} onClick={() => this.onClickEdit(_user)}></button>
                        <button style={delStyle} onClick={() => this.onClickDel(_user)}></button>
                    </div>
                </div>
            </li>
        );
    }

    render() {
        var usersList = this.props.users.map(x => this.createUserNode(x));
        return (
            <ul>
                <li className="row row-header">
                    <div className="name name-header" onClick={(e) => this.onClickSort(e, "name")}>Name</div>
                    <div className="email email-header" onClick={(e) => this.onClickSort(e, "email")}>E-mail address</div>
                    <div className="phone phone-header" onClick={(e) => this.onClickSort(e, "phone")}>Phone number</div>
                </li>
                {usersList}
            </ul>
        );
    }
}