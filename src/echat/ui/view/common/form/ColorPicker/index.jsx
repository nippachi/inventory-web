let React          = require("react");
let {SketchPicker} = require("react-color");

const classNames = require("echat/ui/view/common/form/ColorPicker/classNames");


module.exports = class extends React.Component {
  componentWillMount() {

    this.setState(
      {
        displayColorPicker: false,
        color             : this.props.defaultColor
      })
  }

  render() {

    let {
          label,
          onChange,
          name,
          type     = "button",
          defaultColor,
          position = "top",
          className,
          ...props
        }          = this.props;

    let positions = {
      "top"   : classNames.PopoverTop,
      "bottom": classNames.PopoverBottom
    };

    return (
      <div
        {...props}
        className={
          [
            classNames.ColorPicker,
            className
          ].join(" ")
        }
      >
        {label &&
        <span
          className={classNames.Label}
        >
          {label}
        </span>
        }
        <div
          className={type=="button" && classNames.Swatch}
          onClick={() => {
            this.setState({displayColorPicker: !this.state.displayColorPicker})
          }}
        >
          {type == "button" &&
          <div
            style={{
              backgroundColor: this.state.color
            }}
            className={classNames.Color}
          />
          }
          { this.state.displayColorPicker || type != "button" ?
            <div className={
              [
                type == "view" ? classNames.View : classNames.Popover,
                type == "button" && positions[position]
              ].join(" ")}>
              <div
                className={type == "button" ? classNames.Cover : undefined}
                onClick={() => {
                  this.setState({displayColorPicker: false})
                }}
              />
              <div
                className={classNames.SketchPicker}
              >
                <SketchPicker
                  color={ this.state.color }
                  onChange={(color) => {
                    let rgba = "rgba(" + [
                        color.rgb.r,
                        color.rgb.g,
                        color.rgb.b,
                        color.rgb.a
                      ].join(",") + ")";
                    this.setState({color: rgba});
                    onChange && onChange(color)
                  }}
                />
              </div>
            </div> : null }
        </div>
        <input
          name={name}
          className={classNames.Input}
          value={this.state.color}
        />
      </div>
    )
  }
};

