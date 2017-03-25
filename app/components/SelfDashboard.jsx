import React, { Component } from 'react';
import SelfCarousel from './SelfCarousel';
import SelfSummary from './SelfSummary';

export default class SelfDashboard extends Component {
    render() {
        return (
            <div id="self-dashboard">
                <SelfCarousel />
                <SelfSummary showModal={this.props.showModal}/>
            </div>
        )
    }
}
