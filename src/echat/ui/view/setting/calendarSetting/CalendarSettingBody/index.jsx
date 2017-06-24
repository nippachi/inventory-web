let React         = require("react");
let BusinessHours = require("echat/ui/view/setting/calendarSetting/BusinessHours");
let Calendar      = require("echat-common/model/Calendar");
let Button        = require("react-material/ui/view/Button");

const classNames = require("echat/ui/view/setting/calendarSetting/CalendarSettingBody/classNames");

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            calendars: []
        })
    }

    componentDidMount() {
        (async() => {
            let calendars = await this.props.operateApi(
                a => Calendar.find({
                    ...a
                })
            );

            this.setState({
                calendars: calendars.sort((a, b) => a.dayOfTheWeek < b.dayOfTheWeek ? -1 : a.dayOfTheWeek > b.dayOfTheWeek ? 1 : 0)
            })
        })()
    }

    componentWillUnmount() {

    }

    render() {
        let {
                operateApi,
                ...props
            } = this.props;
        console.log(this.state.calendars)

        return (
            <div
                {...props}
                className={classNames.Host}
            >
                <div
                    className={classNames.BusinessHours}
                >
                    {
                        this.state.calendars.map(x =>
                            <BusinessHours
                                calendar={x}
                                key={x.id}
                                onUpdate={(c)=>{
                                    this.setState({
                                        calendars:this.state.calendars.map( a => a.id == c.id ? c : a)
                                    })
                                }}
                            />
                        )
                    }
                </div>
                <div>
                    <Button
                        type="raised"
                        onClick={() => {
                            (async() => operateApi(
                                () => this.state.calendars.map(c => c.save())
                            ))()
                        }}
                        className={classNames.Button}
                    >
                        変更を保存
                    </Button>
                </div>
            </div>
        )
    }
};