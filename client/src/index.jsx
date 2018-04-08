import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false
  	}
    this.getMovies = this.getMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  getMovies(genre) {
    axios.get('/search', {
      params: {
        genre: genre
      }
    })
    .then(({data}) => {
      this.setState({movies: data});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFavorites() {
    axios.get('/favorites')
    .then(({data}) => {
      this.setState({favorites: data});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getMovies('28');
    this.getFavorites()
  }
  
  saveMovie(item) {
    axios.post('/save', {item: item})
    .then(({data}) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err);
    })
    this.getFavorites()
  }

  deleteMovie(item) {
    axios.post('/delete', {item: item})
    .then(({data}) => {
      console.log('Deleted!');
    })
    .catch((err) => {
      console.log(err);
    })
    this.getFavorites();
  }

  swapFavorites() {
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  handleClick() {
    this.state.showFaves ? this.deleteMovie : this.saveMovie
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      <div className="main">
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} deleteMovie={this.deleteMovie} saveMovie={this.saveMovie}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));