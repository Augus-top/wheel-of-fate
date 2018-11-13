import React, { Component } from 'react';

// import { Search, Footer } from './common';
import gitIcon from './images/git_icon.svg';
import cardImage from './images/cardblue.png';
import cardImage2 from './images/cardred.png';

const frontHeaderMsg = 'The Wheel of Fate is Turning';

class FrontCard extends Component {

  getImgAngle(img) {
    const matrix = window.getComputedStyle(img, null).getPropertyValue('transform');
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    if (angle < 0) angle = 360 + angle; 
    return angle;
  }

  imageClick(e) {
    console.log('Click');
    const img = e.target;
    const angle = this.getImgAngle(img);
    console.log(angle);
    // const image = e.target;
    // image.classList.toggle('is-flipped');
    // console.log(image);
    // const front = document.querySelector('.cardFront');
    // front.classList.toggle('is-flipped');
    // const back = document.querySelector('.main-front');
    // back.classList.toggle('is-flipped');
    // console.log(card);
  } 

  render() {
    return(
      <main className='main-front'>
        <img className='card cardBack' src={cardImage} onClick={(e) => this.imageClick(e)} alt='Card'/>
        <img className='card cardFront' src={cardImage2} onClick={(e) => this.imageClick(e)} alt='Card'/>
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
        <FrontHeader headerMsg={frontHeaderMsg} typingSpeed='30'/>
        <FrontCard/>
        <Footer/>
      </div>
    );
  }
} 