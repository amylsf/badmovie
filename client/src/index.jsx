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
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false
  	}
    this.getMovies = this.getMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
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

  componentDidMount() {
    this.getMovies('28')
  }
  
  saveMovie(item) {
    axios.post('/save', {item: item})
    .then(({data}) => {
      console.log('Item saved successfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteMovie(item) {
    axios.post('/delete', {item: item})
    .then(({data}) => {
      console.log('Deleted!');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  swapFavorites() {
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      <div className="main">
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));