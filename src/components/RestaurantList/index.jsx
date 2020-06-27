import React from 'react';
import { connect } from 'react-redux';
import Pagination from '../Pagination';
import './style.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurantCard">
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>{restaurant.area}</p>
      <p>{restaurant.price}</p>
    </div>
  );
};

class RestaurantList extends React.Component {
  render() {
    if (!this.props.restaurants) {
      return '';
    }
    return (
      <>
        <div className="container">
          {this.props.restaurants.map((restaurant, index) => {
            return <RestaurantCard key={index} restaurant={restaurant} />;
          })}
        </div>
        <div className="footer">
          <Pagination />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { restaurants: state.restaurants.restaurants };
};

export default connect(mapStateToProps, null)(RestaurantList);
