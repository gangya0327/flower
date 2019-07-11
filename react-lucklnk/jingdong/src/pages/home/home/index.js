import React from "react";
import Css from "../../../assets/css/home/home/index.css";

export default class HomeComponent extends React.Component {
  render() {
    return (
      <div class={Css["bottom-nav"]}>
        <ul>
          <li class={Css["home"] + " " + Css["active"]} />
          <li class={Css["text"] + " " + Css["active"]}>首页</li>
        </ul>
        <ul>
          <li />
          <li />
        </ul>
        <ul>
          <li />
          <li />
        </ul>
      </div>
    );
  }
}
