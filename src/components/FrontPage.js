import React, { Component } from 'react';

import { getAnimes } from '../api/apiHandler';
import FrontCard from './FrontCard';
import gitIcon from '../images/git_icon.svg';

const frontHeaderMsg = 'The Wheel of Fate is Turning';

const FrontLoader = (props) => {
  return (
    <section className="loader">
      <div className="spinner">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <h1>Loading</h1>
    </section>
  );
};

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

const Footer = () => {
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

  componentDidMount() {
    this.prepareAnimes();
  }

  async prepareAnimes() {
    const animes = await getAnimes();
    if (animes === 'error') return this.errorActivator();
    this.setState({animes: animes});
  }

  activateError = () => this.setState({error: true});

  render() {
    if (this.state.error) {
      return (<div className='error'></div>);
    }
    if (this.state.animes === undefined) {
      return (<FrontLoader/>);
    }
    return (
      <div className='grid-wrapper'>
        <FrontHeader headerMsg={frontHeaderMsg} typingSpeed='50'/>
        <FrontCard loadedAnimes={this.state.animes} videoActivator={this.props.videoActivator} errorActivator={this.activateError}/>
        <Footer/>
      </div>
    );
  }
} 