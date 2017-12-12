import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

class SearchFieldForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Search</label>
          <div>
            <Field
              className="search-field"
              name="search"
              component="input"
              type="text"
              placeholder="Search for a Country!"
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <button className="btn-override" type="submit" disabled={pristine || submitting}>
              Submit
            </button>
          </div>
          <div className="six columns">
            <button className="btn-override" type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </div>
      </form>
    );
  }
}
// Decorate with redux-form
SearchFieldForm = reduxForm({
  form: 'selectingFormValues', // a unique identifier for this form
})(SearchFieldForm);

// Decorate with connect to read form values
const selector = formValueSelector('selectingFormValues'); // <-- same as form name
SearchFieldForm = connect(state => {
  // can select values individually
  const searchValue = selector(state, 'search');
  // or together as a group
  // const { firstName, lastName } = selector(state, 'firstName', 'lastName')
  return {
    searchValue,
  };
})(SearchFieldForm);

export default SearchFieldForm;
