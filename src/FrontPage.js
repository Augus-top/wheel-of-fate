import React, { Component } from 'react';

import { getAnimes } from './apiHandler';
import gitIcon from './images/git_icon.svg';
import cardImage from './images/cardblue.png';
import anime from './images/anime.jpg';

const frontHeaderMsg = 'The Wheel of Fate is Turning';

class FrontCard extends Component {

  state = {
    animationRunning: true,
    frontImg: anime
  }

  componentDidMount() {
    this.prepareAnimes();
  }

  async prepareAnimes() {
    const animes = await getAnimes();
    console.log(animes);
    this.setState({animes: animes});
  }

  getImgAngle(img) {
    const matrix = window.getComputedStyle(img, null).getPropertyValue('transform');
    if(matrix === 'none') return;
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    if (angle < 0) angle = 360 + angle; 
    return angle;
  }

  imageClick(e) {
    if(!this.state.animationRunning || this.state.animes === undefined) return;
    const img = e.target;
    const angle = this.getImgAngle(img);
    const choiced = Math.floor(angle / 60);
    console.log(choiced);
    this.setState({animationRunning: false, frontImg: this.state.animes[choiced].img});
    img.addEventListener('animationiteration', () => {
      img.classList.toggle('spinning');
      const div = document.getElementsByClassName('main-front');
      div[0].classList.toggle('flipper');
      div[0].classList.toggle('is-flipped');
    });
  } 

  render() {
    return(
      <main className='main-front'>
        <img className='card cardBack spinning' src={cardImage} onClick={(e) => this.imageClick(e)} alt='Card'/>
        <img className='card cardFront' src={this.state.frontImg} onClick={(e) => this.imageClick(e)} alt='Card'/>
      </main>
    );
  }
}

class FrontHeader extends Component {
  state = {
    msg: ''
  };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.typeMsg(), 
      this.props.typingSpeed
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  typeMsg() {
    if (this.state.msg.length === this.props.headerMsg.length){
      clearInterval(this.timerID);
      return;
    }
    this.setState(prevState => ({
      msg: prevState.msg.concat(this.props.headerMsg.charAt(prevState.msg.length))
    }));
  }

  render() {
    return (
        <header className='flex-container header-front'>
            <h1>{this.state.msg}</h1>
        </header>
    );
  }
}

export const Footer = () => {
  return (
    <footer className='flex-container footer'>
      <a href='https://github.com/Augus-top/wheel-of-fate'><img src={gitIcon} alt='Git Page'/></a>
    </footer>
  );
};

export default class FrontPage extends Component {
  render() {
    return (
      <div className='grid-wrapper'>
        <FrontHeader headerMsg={frontHeaderMsg} typingSpeed='10'/>
        <FrontCard/>
        <Footer/>
      </div>
    );
  }
} 