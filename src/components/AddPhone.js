import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: "",
      brand: "",
      price: "",
      image: "",
      // each empty string in "specs" will display an <input> tag
      specs: [ "", "", "", ],
      isSubmitSuccessful: false,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  syncSpecs(event, index) {
    const { specs } = this.state;
    // update the spec value at the given index
    specs[index] = event.target.value;
    // set the state with the updated specs array
    this.setState({ specs });
  }

  handleSubmit(event) {
    // stop the page refresh
    event.preventDefault();

    // PUT and POST requests receive a 2nd argument: the info to submit
    // (we are submitting the state we've gathered from the form)
    axios.post(
      "http://localhost:5555/api/phones",
      this.state,
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("Add Phone", response.data);
        this.setState({ isSubmitSuccessful: true });
      })
      .catch(err => {
        console.log("Add Phone ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    if (this.state.isSubmitSuccessful) {
      // redirect back to the phone list page if the form submission worked
      return <Redirect to="/phone-list" />;
    }

    return (
      <section className="AddPhone">
        <h2>Add a Phone</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Model:
            <input value={this.state.model}
                onChange={event => this.genericSync(event)}
                type="text" name="model" placeholder="iPhone Xs" />
          </label>

          <label>
            Brand:
            <input value={this.state.brand}
                onChange={event => this.genericSync(event)}
                type="text" name="brand" placeholder="Apple" />
          </label>

          <label>
            Price:
            <input value={this.state.price}
                onChange={event => this.genericSync(event)}
                type="number" name="price" placeholder="999" />
          </label>

          <label>
            Image URL:
            <input value={this.state.image}
                onChange={event => this.genericSync(event)}
                type="url" name="image" placeholder="http://example.com" />
          </label>

          <h3>Specs</h3>
          <p>3 characters or more</p>
          {this.state.specs.map((oneSpec, index) => {
            return (
              <input key={index} type="text" value={oneSpec}
                  onChange={event => this.syncSpecs(event, index)} />
            );
          })}

          <button>Save This Phone</button>
        </form>
      </section>
    );
  }
}

export default AddPhone;
