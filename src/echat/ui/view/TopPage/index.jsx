let React = require("react");

module.exports = class extends React.Component {
  render() {
    let {
          location,
          operateApi,
          joinVisitor,
          visitors,
          selectedVisitorIds,
          accountDictionaries,
          operatorDictionaries,
          operators,
          operator,
          ...props
        } = this.props;
    return (
      <h2>チャット</h2>
    )
  }
};
