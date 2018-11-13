import React, { Component } from 'react';

import FrontCard from './FrontCard';
import gitIcon from '../images/git_icon.svg';

const frontHeaderMsg = 'The Wheel of Fate is Turning';

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

  state = {
    error: false
  }

  activateError = () => this.setState({error: true});

  render() {
    if (this.state.error) {
      return (<div className='error'></div>);
    }
    return (
      <div className='grid-wrapper'>
        <FrontHeader headerMsg={frontHeaderMsg} typingSpeed='50'/>
        <FrontCard videoActivator={this.props.videoActivator} errorActivator={this.activateError}/>
        <Footer/>
      </div>
    );
  }
} 