let React        = require("react");
let Dialog       = require("react-material/ui/view/Dialog");
let DialogHeader = require("react-material/ui/view/DialogHeader");
let DialogBody   = require("react-material/ui/view/DialogBody");
let DialogFooter = require("react-material/ui/view/DialogFooter");
let Button       = require("react-material/ui/view/Button");
let Ripple       = require("react-material/ui/effect/Ripple");
let Radio        = require("react-material/ui/view/Radio");

const classNames = require("echat/ui/view/setting/notificationSetting/SoundDialog/classNames");

module.exports = class extends React.Component {

    componentWillMount() {
        this.setState({
            selectedSound: undefined
        })
    }

    componentDidMount() {
    }

    render() {
        let {
                sounds       = [],
                onCancel,
                onSelect,
                visible      = false,
                ...props,
            }                = this.props;

        return (
            <div>
                <Dialog
                    visible={visible}
                    {...props}
                >
                    <DialogHeader>
                        <h2>サウンド選択</h2>
                    </DialogHeader>
                    <DialogBody
                        className={classNames.Host}
                    >
                        {sounds.map(x => <div
                            onClick={() => {
                                this.setState({selectedSound: x});
                            }}
                            key={x.id}
                            className={classNames.SoundItem}
                        >
                            <Radio
                                enabled={x == this.state.selectedSound}
                            />
                            {x.title}
                        </div>)}
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            type="flat"
                            onClick={() => {
                                onCancel && onCancel();
                                this.setState({selectedSound: undefined})
                            }}
                        >
                            キャンセル
                        </Button>
                        <Button
                            component="button"
                            type="flat"
                            onClick={() => {
                                onSelect && onSelect(this.state.selectedSound);
                                this.setState({selectedSound: undefined})
                            }}
                        >
                            選択
                        </Button>
                    </DialogFooter>
                    <audio
                        src={this.state.selectedSound && this.state.selectedSound.soundFilePath}
                        preload="auto"
                        controls
                        className={classNames.Audio}
                        autoPlay
                    />
                </Dialog>
            </div>);

    }
};