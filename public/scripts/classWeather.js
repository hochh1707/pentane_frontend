export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            options: [
                { value: true, label: 'Yes' },
                { value: false, label: 'No' }
            ],
            value: null
        };
    }

    componentDidMount() {
        this.getStations();
    }

    getStations() {
        fetch('https://randomuser.me/api/?results=5', {
            method: "GET" // POST
        }).then(res => res.json())
        .then(res => this.setState({stations: res.stations}))
        .catch(e => /* catch any errors here */)
    }

    render() {
        return(
            <View></View>
        )
    }

}
