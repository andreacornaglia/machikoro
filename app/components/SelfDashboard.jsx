import React, { Component } from 'react';
import SelfCarousel from './SelfCarousel';
import SelfSummary from './SelfSummary';

export default class SelfDashboard extends Component {
    render() {
        return (
            <div id="self-dashboard">
                <SelfCarousel />
                <SelfSummary showStatus={this.props.showStatus} showModal={this.props.showModal}/>
            </div>
        )
    }
}
