import React, { Component } from 'react';

export default class SelfSummary extends Component {
    render() {
        return (
            <div className="summaryContainer">
                <h1>Summary</h1>
                <h4>Name</h4>
                <h4>Money</h4> 
                <br></br>
                <div className="unlockCards" id="subwayStation"></div>
                <div className="unlockCards" id="coneyIsland"></div>
                <div className="unlockCards" id="shoppingMall"></div>
                <div className="unlockCards" id="radioTower"></div>
            </div>
        )
    }
}