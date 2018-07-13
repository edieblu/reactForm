import React from 'react';

 class Form extends React.Component {
  state = {
    familyName:'',
    givenName:''
  }

  change = (e) => {
    this.props.onChange({[e.target.name]: e.target.value})
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      familyName:'',
      givenName:''
    })
    this.props.onChange({
      familyName:'',
      givenName:''
    })
  }


  render() {
    return (
      <form>
        <input 
          name="familyName"
          placeholder="Family Name"
          value={this.state.familyName}
          onChange = {e => this.change(e)}
          />
          <br />
          <input 
          name="givenName"
          placeholder="Given Name"
          value={this.state.givenName}
          onChange = {e => this.change(e)}
          />
           <br />
          <button onClick={e => this.onSubmit(e)}>
            Submit
          </button>
      </form>

    );
  }
}

export default Form;