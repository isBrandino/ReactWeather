import React, { Component } from 'react'
import DOMPurify from 'dompurify';
import axios from 'axios'
import './MainPanel.css';

let getWeather = "";
let getLocation = "";

function fTemp(value) {
    let temp = ((8 / 5) * value + 32).toFixed(2);
    return temp;
}

function cTemp(value) {
    let temp = (value);
    return temp.toFixed(2);
}

   //set background according to weather
export class MainPanel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            location: "",
            weather: "Check The Current Weather",
            feels: "",
            wind: "",
            humidity: "",
            image: "",
            pressure: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeBackground(event) {
        if (getWeather.weather_descriptions[0] !== undefined) {
            var weatherConidtion = (getWeather.weather_descriptions[0]).toLowerCase();
            this.props.onChangeBackground(weatherConidtion);
        } else {
            this.props.onChangeBackground("default");
        }
    }

    handleChange(event) {
        this.setState({ location: DOMPurify.sanitize(event.target.value) });
    }

    //returns api data to state variables
    handleSubmit(event) {
        
        event.preventDefault();
        const ip = "https://api.checkingtheweather.com/";
        var safestate = (this.state.location).replace(/[!@#$%^&*]/g, "");
        axios.get(ip + `?location=` + safestate)
            .then(res => {
                if ((res.data.current || res.data.location) !== undefined) {
                    getWeather = res.data.current;
                    getLocation = res.data.location;
                    this.setState({
                        location: `${getLocation.name}, ${getLocation.region}`,
                        weather: `${getWeather.weather_descriptions[0]}, ${fTemp(getWeather.temperature)}°F / ${cTemp(getWeather.temperature)} °C`,
                        feels: `Feels like: ${fTemp(getWeather.feelslike)}°F`,
                        wind: `Wind: ${getWeather.wind_dir}, ${getWeather.wind_speed} MPH`,
                        humidity: `Humidity: ${getWeather.humidity}%`,
                        image: `${getWeather.weather_icons}`,
                        pressure: `Pressure: ${(getWeather.pressure)} mb`,
                    });
                    if (getLocation.region === "") {
                        this.setState({
                            location: `${getLocation.name}`,
                        });
                    };
                };

                this.onChangeBackground();
            }).catch(error => {
                
            })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <>
                <div className="main-panel">
                    <div className="panel-container">
                        <form onSubmit={this.handleSubmit} >
                            <div className="main-search">
                                <input type="text" title="Enter City Here" aria-label={this.state.location} value={this.state.location}
                                    onChange={this.handleChange} placeholder="Enter a location" id="location"
                                    name="location" maxLength="40" required ></input>
                            </div>
                            <button type="submit" aria-label="search" >Search</button>
                        </form>
                        <div className="weather-info">
                            <h1 title={this.state.location} className="locaiton">{this.state.location}</h1>
                            <h2 title={this.state.weather} className="weather">{this.state.weather}</h2>
                            <img src={this.state.image} alt="" title={this.state.weather}/>
                            <h3 title={this.state.feels}  className="feels" value>{this.state.feels}</h3>
                            <h3 className="air" title={`${this.state.wind}  ${this.state.humidity}`} value>{this.state.wind}&emsp;{this.state.humidity}</h3>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MainPanel;