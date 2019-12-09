// document.write("search page")


"use strict"
import React from "react"
import ReactDOM from "react-dom"
import '../../common'
import search from "./image/search.jpg"
import {a} from './tree-shaking'
import './search.less'

if (false) {
    a()
}

class Search extends React.Component {
    render () {
        // debugger
        // const funcA = a()
        return (
            <div className="search-text">
                    <img src={search}></img>
               {/* {funcA} search text搜索啊热更新</div> */}
               {funcA} search text搜索啊热更新</div>
        )
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById("root")
)