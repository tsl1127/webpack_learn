// document.write("search page")


"use strict"
import React from "react"
import ReactDOM from "react-dom"
import largeNumberTsl from 'large-number-tsl'
// import '../../common'
import search from "./image/search.jpg"
// import {a} from './tree-shaking'
import './search.less'

// if (false) {
//     a()
// }

class Search extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         Text:null
    //     }
    // }

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
                    <img src={search} onClick={this.loadComponent.bind(this)}></img>
            </div>
        )
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById("root")
)