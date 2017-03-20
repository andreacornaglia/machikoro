import React, { Component } from 'react';
import SelfCarousel from './SelfCarousel';
import SelfSummary from './SelfSummary';

export default class SelfTest extends Component {
    render() {
        return (
            <div>
                <SelfCarousel />
                <SelfSummary />
            </div>
        )
    }
}