"use strict"
// import React from "react"
// import largeNumberTsl from 'large-number-tsl'
// import search from "./image/search.jpg"
// import './search.less'

const React = require('react')
const largeNumberTsl = require('large-number-tsl')
const logo  = require("./image/logo.png")
require("./search.less")

class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }

    //有条件的import就是动态引入，上面的没条件的就是动态引入
    loadComponent () {
        import('./text.js').then((Text) => {  //import后是个promise
            this.setState({
                Text: Text.default
            })
        })
    }

    render () {
        const { Text } = this.state
        const addResult = largeNumberTsl('999','1')
        return (
            <div className="search-text">
                {Text ? <Text/> : null}
                {addResult}
                搜索文字内容xxx
                    <img src={logo.default} onClick={this.loadComponent.bind(this)}></img>
            </div>
        )
    }
}

// ReactDOM.render(
//     <Search />,
//     document.getElementById("root")
// )  //在服务端是不能识别的

module.exports = <Search />