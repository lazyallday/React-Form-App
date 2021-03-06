import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Form for inline editing **/
class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = { value: this.props.user };
    }

    handleCancel = (e) => {
        this.props.cancel(this.props.user);
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.props.user.fullName = this._input_name.value;
        this.props.user.email = this._input_email.value;
        this.props.user.phone = this._input_phone.value;
        this.props.update(this.props.user);
    }

    handleChange = (e) => {
        e.preventDefault();
        if (
            this._input_name.value === '' || this._input_email.value === '' || this._input_phone.value === ''
        ) this.setState({ value: '' });
        else this.setState({ value: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleUpdate} className="edit-user">
                <input
                    type="text"
                    pattern="^[a-zA-Z0-9äöüÄÖÜ ]*$"
                    title="Special characters are not allowed."
                    ref={(a) => this._input_name = a}
                    defaultValue={this.props.user.name}
                    field="name"
                    id="input-name"
                    placeholder="Full name"
                    className="input"

                    onChange={this.handleChange}
                />

                <input
                    type="email"
                    ref={(a) => this._input_email = a}
                    defaultValue={this.props.user.email}
                    field="email"
                    id="input-email"
                    placeholder="E-mail address"
                    className="input"

                    onChange={this.handleChange}
                />

                <input
                    type="tel"
                    pattern="[0-9.]*"
                    title="Only numbers are accepted."
                    ref={(a) => this._input_phone = a}
                    defaultValue={this.props.user.phone}
                    field="tel"
                    id="input-phone"
                    placeholder="Phone number"
                    className="input"

                    onChange={this.handleChange}
                />

                <button className="btn cancel" onClick={() => this.handleCancel()}>Cancel</button>
                <button type="submit" className="btn saveUser" disabled={!this.state.value}>Save</button>
            </form>
        )
    }
}

EditForm.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default EditForm;