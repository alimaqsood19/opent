import React from 'react';
import PostList from './PostList';
import SearchBar from './SearchBar';
import OpenTable from '../apis/OpenTable';

class App extends React.Component {
  state = {};

  componentDidMount() {
    this.onTermSubmit('toronto');
  }

  onTermSubmit = async (term) => {
    const response = await OpenTable.get('/restaurants?city='`${term}`);
    this.setState({});
  };

  render() {
    return (
      <div>
        <PostList />
        <SearchBar onFormSubmit={this.onTermSubmit} />
      </div>
    );
  }
}

export default App;
