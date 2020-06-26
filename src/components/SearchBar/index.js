import React from 'react';
import { connect } from 'react-redux';
import { fetchRestaurantList } from './actions';
import './style.css';

class SearchBar extends React.Component {
  state = { city: '', price: '', postal: '' };

  onInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.restaurantList(
      this.state.city,
      this.state.price,
      this.state.postal
    );
  };

  render() {
    return (
      <div className="searchSection">
        <form onSubmit={this.onFormSubmit}>
          <h1>Restaurants</h1>

          <div className="searchContainer">
            <div className="stack">
              <label>City</label>
              <input
                className="inputBox"
                name="city"
                type="text"
                value={this.state.city}
                onChange={this.onInputChange}
              />
            </div>
            <div className="stack">
              <label>Price</label>
              <input
                className="inputBox"
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.onInputChange}
              />
            </div>
            <div className="stack">
              <label>Postal Code</label>
              <input
                className="inputBox"
                name="postal"
                type="text"
                value={this.state.postal}
                onChange={this.onInputChange}
              />
            </div>
            <button className="searchBtn">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.restaurants.loading,
  error: state.restaurants.error,
  restaurants: state.restaurants.restaurants,
});

const mapDispatchToProps = (dispatch) => ({
  restaurantList: (city, refine, price, postal) =>
    dispatch(fetchRestaurantList(city, refine, price, postal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
