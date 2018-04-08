import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: ''
    }
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }
  
  getGenres() {
    axios.get('/genres')
    .then(({data}) => {
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

  handleChange(event) {
    this.setState({
      selectedGenre: event.target.value
    })
  }

  search() {
    this.props.getMovies(this.state.selectedGenre)
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select name='selectedGenre' value={this.state.value} onChange={this.handleChange}>
          {this.state.genres.map((genre) => (
            <option value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/><br/>
        <button onClick={this.search}>Search</button>
      </div>)
  }
}

export default Search
