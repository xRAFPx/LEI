import React, { Component } from 'react';

class Form extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        emailStatus: ''
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    }

    submitForm = (e) => {
        //console.log(this.state);
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('lod', () => {
            
        });

        xhr.open('GET', 'http:')

        e.preventDefault();
    }

    render(){
        const {
            name,
            email,
            message
        } = this.state;
        return(
            <div className="formBlock">
                <form onSubmit={this.submitForm}>
                    <label>
                        <input type="text" placeholder="Name" value={name} onChange={this.handleChange('name')} />
                    </label>
                    <label>
                        <input type="email" placeholder="Email" value={email} onChange={this.handleChange('email')} />
                    </label>
                    <label>
                        <textarea placeholder="Message" value={message} onChange={this.handleChange('message')} />
                    </label>
                    <label>
                        <input type="submit" className="submitBtn" value="Submit" />
                    </label>
                </form>
            </div>
        );
    }
}

export default Form;