import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import Select from '../components/Select';
require('dotenv').config();

// set state and bind
class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
      givenName: '',
      familyName: '',
      genderOptions: [],
      gender: '',
			age: 0,
    };
    
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }
	
	// fetch form options from database
	componentDidMount() {
		fetch('./fake_db.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
          givenName: data.ownerName,
          familyName: data.familyName,
          genderOptions: data.genderOptions,
          gender: data.gender,
          age: data.age,
				});
			});
	}

	// handle inputs with real-time console logging 
	handleGivenName(e) {
		this.setState({ givenName: e.target.value }, () => console.log('Given Name:', this.state.givenName));
  }
  handleFamilyName(e) {
		this.setState({ familyName: e.target.value }, () => console.log('Family Name:', this.state.familyName));
	}
	handleAge(e) {
		this.setState({ age: e.target.value }, () => console.log('age', this.state.age));
	}
	handleGenderOptions(e) {
		this.setState({ gender: e.target.value }, () => console.log('gender options', this.state.gender));
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
      givenName: '',
      familyName: '',
      gender: '',
			age: 0,
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
      "names": [
        {
          givenName: this.state.givenName,
          familyName: this.state.familyName,
        }
      ],
      "gender": this.state.gender,
			"age": this.state.age
		};

	// 	// send to Bahmni person API
	// 	const url = process.env.REACT_APP_URL;


  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(formPayload), // data can be `string` or {object}!
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //     credentials: 'include'
    
  //   }).then(res => res.json())
  //   .catch(error => console.error('Error:', error))
  //   .then(response => console.log('Success:', response));
    

	// 	console.log('Send this in a POST request:', formPayload);
	// 	this.handleClearForm(e);
	}

	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5>Sign Up Form</h5>
				<SingleInput
					inputType={'text'}
          title={'Given name:'}
					name={'givenName'}
					controlFunc={e => this.handleGivenName(e)}
					content={this.state.givenName}
					placeholder={'Given name'} />
        
        <SingleInput
					inputType={'text'}
          title={'Family name:'}
					name={'familyName'}
					controlFunc={e => this.handleFamilyName(e)}
					content={this.state.familyName}
					placeholder={'Family name'} />

				<Select
					name={'genderList'}
					placeholder={'Gender'}
					controlFunc={e => this.handleGenderOptions(e)}
					options={this.state.genderOptions}
					selectedOptions={this.state.gender} />
	
				<SingleInput
					inputType={'number'}
					title={'Age:'}
					name={'age'}
					controlFunc={e => this.handleAge(e)}
					content={this.state.age}
					placeholder={'Age'} />

				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>Clear form</button>
			</form>
		);
	}
}

export default FormContainer;
