import React, { Component } from 'react';
import SelfDashboard from './SelfDashboard';
import CardGrid from './CardGrid';

export default class GamePage extends Component {
    render() {
        return (
            <div>
                  <CardGrid />
                  <SelfDashboard />
            </div>
        )
    }
}
