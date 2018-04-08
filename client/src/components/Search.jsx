import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    }
    this.getGenres = this.getGenres.bind(this);
  }
  
  getGenres() {
    axios.get('/genres')
    .then(({data}) => {
      console.log(data)
      this.setState({
        genres: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getGenres()
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select>
          {this.state.genres.map((genre) => (
            <option value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/><br/>
        <button>Search</button>
      </div>)
  }
}

export default Search
