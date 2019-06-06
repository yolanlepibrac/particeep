

import React, { Component } from 'react';
import Card from './Card';
import Movies from '../Assets/movies';
import { connect } from "react-redux";
import { addCategory } from "../Actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addCategory: article => dispatch(addCategory(article)),
    categorySelectedRedux:dispatch.categorySelectedRedux,
  };
};




class DisplayCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: Movies,
      categorySelected : [],
    }
  }

  deleteCard = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies.splice(i,1);
        this.setState({movies : newMovies})
      }
    }
    console.log(this.state.movies)
  }

  addlike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].likes++;
        this.setState({movies : newMovies})
      }
    }
  }

  deletelike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].likes--;
        this.setState({movies : newMovies})
      }
    }
  }

  adddislike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].dislikes++;
        console.log(newMovies)
        this.setState({movies : newMovies})
      }
    }
  }

  deletedislike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].dislikes--;
        this.setState({movies : newMovies})
      }
    }
  }


  renderMovies = (movie) => {
      if(this.props.categorySelected.length === 0){
        return <Card Title={movie.title} Category={movie.category} Id={movie.id} Likes={movie.likes} Dislikes={movie.dislikes} delete={this.deleteCard} addlike={this.addlike} adddislike={this.adddislike} deletelike={this.deletelike} deletedislike={this.deletedislike}></Card>
      }else{
        for(var i=0; i<this.props.categorySelected.length;i++){
          if(movie.category === this.props.categorySelected[i]){
            return <Card Title={movie.title} Category={movie.category} Id={movie.id} Likes={movie.likes} Dislikes={movie.dislikes} delete={this.deleteCard} addlike={this.addlike} adddislike={this.adddislike} deletelike={this.deletelike} deletedislike={this.deletedislike}></Card>
          }
        }

      }

  }


  handleCheck = (category) => {
    //console.log(category);
    this.props.addCategory({ category });
    this.forceUpdate();

  }


  render() {
    var tabOfCategories = [];
    var categories = {};
    for(var i=0;i<this.state.movies.length;i++){
      let category = this.state.movies[i].category
      if(categories[category] === true){
        console.log("existing category")
      }else{
        categories[category] = true;
        tabOfCategories.push(
          <div>
            <input type="checkbox" onChange={(e) => this.handleCheck(category)} defaultChecked={this.state.checked}/>
            {category}
          </div>
        )
      }

    }
    return (
      <div>
        <form>
          <label>
            {tabOfCategories}
          </label>
        </form>
        <div style={styles.container}>
          {this.state.movies.map((movie) => (
            this.renderMovies(movie)
          ))}
        </div>
      </div>
    )
  }
}

let styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
    },

}

const mapStateToProps = (state) => {
  return {
    categorySelected:state.categorySelectedRedux,
  }
}

const Display = connect(mapStateToProps, mapDispatchToProps)(DisplayCard);
export default Display;
