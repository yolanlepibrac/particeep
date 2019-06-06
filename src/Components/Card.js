import React, { Component } from 'react';

const widthRatio = 150;
const widthCard = 200;
const heightRatio = 10;

export default class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      like : "",
      dislike : "",
     }
  }

  ComponentDidMount = () => {
    this.setState({
      likes: this.props.Likes,
      dislikes : this.props.Dislikes,
    })
  }

  delete = () => {
    this.props.delete(this.props.Id)
  }

  like = () => {

    if(this.state.like === true){
      this.props.deletelike(this.props.Id);
      this.setState({
        like : false ,
      });
    }else if(this.state.dislike === true){
      this.props.addlike(this.props.Id);
      this.props.deletedislike(this.props.Id);
      this.setState({
        dislike:false,
        like:true,
      });
    }else{
      this.props.addlike(this.props.Id);
      this.setState({
        likes : this.state.likes+1,
        like:true,
      })
    }
  }

  dislike = () => {
    if(this.state.dislike === true){
      this.props.deletedislike(this.props.Id);
      this.setState({
        dislike : false ,
      })
    }else if(this.state.like === true){
      this.props.deletelike(this.props.Id);
      this.props.adddislike(this.props.Id);
      this.setState({
        like:false,
        dislike:true,
      })
    }else{
      this.props.adddislike(this.props.Id);
      this.setState({
        dislike:true,
      })
    }
  }


  render() {
    return (
      <div className="container" style={styles.card}>
        <div><strong>{this.props.Title}</strong>
        </div>
        <div style={{'marginBottom':'10px'}}>{this.props.Category}
        </div>
        <div style={{width:widthRatio, display:'flex', marginLeft:(widthCard-widthRatio)/2, height:heightRatio, marginBottom:10, borderRadius:'10px', overflow:'hidden' }}>
          <div style={{width: widthRatio*this.props.Likes/(this.props.Likes+this.props.Dislikes), backgroundColor:'#AAEEAA', }}>
          </div>
          <div style={{width: widthRatio*this.props.Dislikes/(this.props.Likes+this.props.Dislikes), backgroundColor:'#EEAAAA'}}>
          </div>
        </div>
        {this.props.Src ?
          <img src={this.props.Src} style={{'width':'90%', 'maxHeight':'200px'}}/>
          :
          <img src={require('../Assets/images/notAvailable.jpg')} style={{'width':'90%', 'maxHeight':'200px'}}/>
        }
        <div  style={styles.bottomCard}>
          <button style={styles.buttunBottom} onClick={this.delete} onMouseEnter={this.onHoverDelete} onMouseLeave={this.leaveDelete}>
            <img src={require('../Assets/images/quit.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
          </button>
          <div>
            <button style={styles.buttunBottom} onClick={this.like} onMouseEnter={this.onHoverLike} onMouseLeave={this.leaveLike}>
              {(this.state.like === true) ?
                <img src={require('../Assets/images/likeActive.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                :
                <img src={require('../Assets/images/like.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
              }
            </button>
            <button style={styles.buttunBottom} onClick={this.dislike} onMouseEnter={this.onHoverDislike} onMouseLeave={this.leaveDislike}>
              {(this.state.dislike === true)  ?
                <img src={require('../Assets/images/dislikeActive.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                :
                <img src={require('../Assets/images/dislike.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
              }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

let styles = {
    card:{
      width:  widthCard,
      height: 300,
      margin : 10,
      backgroundColor:'#DDDDDD'
    },
    bottomCard :{
      width: '90%',
      height : 30,
      backgroundColor : '#EEEEEE',
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between',
      paddingLeft : '5%',
      paddingRight : '5%',
    },
    buttunBottom :{
      width: 25,
      height:25,
      margin:0,
      marginRight :10,
      padding:0,
      borderRadius:'10px',
      overflow:'hidden',
      borderWidth:0,
      backgroundColor : '#EEEEEE',
    },
    dislike:{
      marginLeft:10
    }
}
