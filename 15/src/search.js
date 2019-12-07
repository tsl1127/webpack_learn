// document.write("search page")


"use strict"
import React from "react"
import ReactDOM from "react-dom"
import search from "./image/search.jpg"
import './search.less'


class Search extends React.Component {
    render () {
        return (
            <div className="search-text">
                    <img src={search}></img>
                search text搜索啊热更新</div>
        )
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById("root")
)