import Triangle from '../components/Triangle';

const {Component, PropTypes} = React;

class App extends Component {

  state = {seconds: 0}

  componentDidMount() {
    this.invervalID = setInterval(this.tick, 1000);
  }

  tick = () => {
    ReactDOMFiber.unstable_deferredUpdates(() =>
      this.setState(state => ({seconds: (state.seconds % 10) + 1}))
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {

    const {seconds} = this.state;
    const {elapsed} = this.props;

    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform = `scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px)`;

    const containerStyle = {
      position: `absolute`,
      transformOrigin: `0 0`,
      left: `50%`,
      top: `50%`,
      width: `10px`,
      height: `10px`,
      background: `#eee`,
    };

    return (

      <div style={{...containerStyle, transform}}>
        <Triangle x={0} y={0} s={1000}>
          {`${seconds}`}
        </Triangle>
      </div>

    );

  }

}

App.propTypes = {
  elapsed: PropTypes.number
};

export default App;
