import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IState {
    email: string;
}

class NewCandidate extends React.Component<{}, IState> {
    constructor() {
        super();

        this.state = { email: '' };
    }

    public async onSubmit<T>(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        await fetch('/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });
    }

    public onChangeEmail<T>(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ email: event.currentTarget.value });
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' placeholder='Email' onChange={this.onChangeEmail.bind(this)}
                        className='form-control' value={this.state.email} />
                </div>
                <button type='submit' className='btn btn-default'>Create</button>
            </form>
        );
    }
}

ReactDOM.render(<NewCandidate />, document.getElementById('app'));
