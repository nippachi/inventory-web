let Company            = require("echat-common/model/Company");
let React              = require("react");
let Button             = require("react-material/ui/view/Button");
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel");
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList");
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace");
let LinearLayout       = require("react-material/ui/view/LinearLayout");
let TextField          = require("react-material/ui/view/form/TextField");

const classNames = require("echat/ui/view/setting/accountSetting/CompanySettingBody/classNames");

module.exports = class extends React.Component {
  componentWillMount() {
    this.setState(
      {
        company      : undefined,
        selectedIndex: undefined
      })
  }


  componentDidMount() {
    (async() => {
      let company = await this.props.operateApi(
        a => Company.find({
          ...a,
          query: null
        })
      );

      this.setState(
        {
          company: company
        })
    })()
  }

  render() {
    let {
          operateApi,
          ...props
        } = this.props;

    return (
      <div
        {...props}
        className={classNames.Company}
      >
        <ExpansionPanelList
          selectedIndex={this.state.selectedIndex}
          onSelect={({index}) => this.setState({selectedIndex: index})}
        >
          <ExpansionPanel
            labelText="会社名"
            value={this.state.company && this.state.company.companyName}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.company.update(
                    {
                      companyName: e.target.querySelector("*[name='companyName']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="companyName"
                autoFocus={true}
                defaultValue={this.state.company && this.state.company.companyName}
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
            labelText="郵便番号"
            value={this.state.company && this.state.company.zipCode}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.company.update(
                    {
                      zipCode: e.target.querySelector("*[name='zipCode']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="zipCode"
                autoFocus={true}
                defaultValue={this.state.company && this.state.company.zipCode}
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
            labelText="住所"
            value={this.state.company && this.state.company.address}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.company.update(
                    {
                      address: e.target.querySelector("*[name='address']").value
                    }));
                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="address"
                autoFocus={true}
                defaultValue={this.state.company && this.state.company.address}
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
            value={this.state.company && this.state.company.phone}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.company.update(
                    {
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
                defaultValue={this.state.company && this.state.company.phone}
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
            labelText="担当者電話番号"
            value={this.state.company && this.state.company.stuffPhone}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.company.update(
                    {
                      stuffPhone: e.target.querySelector("*[name='stuffPhone']").value
                    }));

                this.setState({
                  selectedIndex: undefined
                })
              }}
              className={classNames.Form}
            >
              <TextField
                name="stuffPhone"
                autoFocus={true}
                defaultValue={this.state.company && this.state.company.stuffPhone}
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
            labelText="メールアドレス"
            value={this.state.company && this.state.company.email}
          >
            <form
              autoComplete="off"
              onSubmit={async(e) => {
                e.preventDefault();

                await operateApi(
                  () => this.state.company.update(
                    {
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
                defaultValue={this.state.company && this.state.company.email}
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
      </div>
    )
  }
};