let React              = require("react");
let Button             = require("react-material/ui/view/Button");
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel");
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList");
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace");
let LinearLayout       = require("react-material/ui/view/LinearLayout");
let RoomInformation    = require("echat/ui/view/widget/RoomInformation");
let TextField          = require("react-material/ui/view/form/TextField");

const classNames = require("echat/ui/view/widget/DialogInformation/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState({
      selectedIndex: undefined,
    })
  }

  componentDidMount() {
  }

  render() {
    let {
          visitor,
          messages=[],
          operateApi,
          className,
          ...props
        } = this.props;

    return (
      <div
        className={
          [
            className,
            classNames.Host
          ].join(" ")
        }
        {...props}
      >
        <ExpansionPanelList
          selectedIndex={this.state.selectedIndex}
          onSelect={({index}) => this.setState({selectedIndex: index})}
          className={classNames.ExpansionPanelList}
        >
          <ExpansionPanel
            labelText="名前"
            value={visitor ? visitor.name : "未設定"}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();
                console.log(visitor)

                await operateApi(
                  () => visitor.update({
                      name: e.target.querySelector("*[name='name']").value
                  })
                );
                
                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="name"
                autoFocus={true}
                defaultValue={visitor && visitor.name}
                required
              />
              <LinearLayout
                orientation="horizontal"
              >
                <FlexibleSpace/>
                <Button
                  component="button"
                >
                  送信
                </Button>
              </LinearLayout>
            </form>
          </ExpansionPanel>
          <ExpansionPanel
            labelText="情報"
            value={visitor ? visitor.information : "未設定"}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => visitor.update({
                    information: e.target.querySelector("*[name='information']").value
                  }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="information"
                autoFocus={true}
                defaultValue={visitor && visitor.information}
                required
              />
              <LinearLayout
                orientation="horizontal"
              >
                <FlexibleSpace/>
                <Button
                  component="button"
                >
                  送信
                </Button>
              </LinearLayout>
            </form>
          </ExpansionPanel>
          <ExpansionPanel
            labelText="email"
            value={visitor ? visitor.email : "未設定"}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => visitor.update({
                    email: e.target.querySelector("*[name='email']").value
                  }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="email"
                autoFocus={true}
                defaultValue={visitor && visitor.email}
                required
              />
              <LinearLayout
                orientation="horizontal"
              >
                <FlexibleSpace/>
                <Button
                  component="button"
                >
                  送信
                </Button>
              </LinearLayout>
            </form>
          </ExpansionPanel>
          <ExpansionPanel
            labelText="電話番号"
            value={visitor ? visitor.phone : "未設定"}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => visitor.update({
                    phone: e.target.querySelector("*[name='phone']").value
                  }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="phone"
                autoFocus={true}
                defaultValue={visitor && visitor.phone}
                required
              />
              <LinearLayout
                orientation="horizontal"
              >
                <FlexibleSpace/>
                <Button
                  component="button"
                >
                  送信
                </Button>
              </LinearLayout>
            </form>
          </ExpansionPanel>
        </ExpansionPanelList>
        <span className={classNames.Border}/>
        <RoomInformation
          visitor={visitor}
          messages={messages}
        />
      </div>
    )
  }
};