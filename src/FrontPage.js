import React, { Component } from 'react';

// import { Search, Footer } from './common';
import gitIcon from './images/git_icon.svg';
import cardImage from './images/cardblue.png';

const frontHeaderMsg = 'The Wheel of Fate is Turning';

class FrontCards extends Component {
  render() {
    return(
      <main className='main-front'>
        <img src={cardImage} alt='Cards'/>
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
        <FrontHeader headerMsg={frontHeaderMsg} typingSpeed='100'/>
        <FrontCards/>
        <Footer/>
      </div>
    );
  }
} 