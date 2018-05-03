import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class UserForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: '' };
    }

    handleSubmit(e) {
        e.preventDefault();
        var newUser =
            {
                name: this._input_name.value,
                email: this._input_email.value,
                phone: this._input_phone.value
            }
        this.props.add(newUser);

        this._input_name.value = "";
        this._input_email.value = "";
        this._input_phone.value = "";

        this.setState({ value: '' });
    }

    handleChange(e) {
        e.preventDefault();
        if (
            this._input_name.value === '' || this._input_email.value === '' || this._input_phone.value === ''
        ) this.setState({ value: '' });
        else this.setState({ value: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    pattern="^[a-zA-Z0-9äöüÄÖÜ ]*$"
                    title="Special characters are not allowed."
                    ref={(a) => this._input_name = a}
                    field="name"
                    id="input-name"
                    placeholder="Full name"
                    className="input"

                    onChange={this.handleChange}
                />
                <input
                    type="email"
                    ref={(a) => this._input_email = a}
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
                    field="tel"
                    id="input-phone"
                    placeholder="Phone number"
                    className="input"
                    onChange={this.handleChange}
                />
                <button type="submit" className="btn addNew" disabled={!this.state.value}>Add new</button>
            </form>
        );
    }
}

UserForm.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}