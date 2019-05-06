import React, { Component } from 'react'
import MultiMonthView, { DatePicker } from 'react-mobile-calendar'
import './index.css'

const days = [
    {
        key: 20190506,
        text: '¥ 3000'
    },
    {
        key: 20190507,
        text: '¥ 1000'
    },
    {
        key: 20190508,
        text: '¥ 1000'
    },
];

const onDayClick = (day, rangeDays, is_complete) => {
    console.log(1, day);
    console.log(2, rangeDays);
    console.log(3, is_complete);
    for (var value of rangeDays) {
        if (value.disable == false) {  //使用rendDay 自定义的数据
            console.log(value.moment.format('YYYY-MM-DD') + '不可以订');
            return false;
        }
    }
    if (is_complete) {
        console.log('选择完毕');
    } else {
        console.log('选择退房时间')
    }
    return true;
};

const rendDay = (day, props) => {
    console.log(9,props);
    let day_my = days.find((value) => (value.key == day.number));
    if (day_my == undefined) {
        day.disable = false;  //自定义数据
        day.money = '暂无';  //自定义数据
    } else {
        day.money = day_my.text;
        day.disable = true;
    }
    //自定义 一天的样式
    props.children = (
        <div className="day">
            <span className="textNum">{day.text}</span>
            <span className="textMoney">{day.money}</span>
        </div>
    );
};

const onDateClick = (day, rangeDays, is_complete) => {
    console.log(1, day);
    let day_my = days.find((value) => (value.key == day.number));
    console.log(8,day_my);
    
    // for (var value of rangeDays) {
    //     if (value.disable == false) {  //使用rendDay 自定义的数据
    //         console.log(value.moment.format('YYYY-MM-DD') + '不可以订');
    //         return false;
    //     }
    // }
    // if (is_complete) {
    //     console.log('选择完毕');
    // } else {
    //     console.log('选择退房时间')
    // }
    // return true;
};

const rendDate = (day, props) => {
    let day_my = days.find((value) => (value.key == day.number));
    if (day_my == undefined) {
        day.disable = false;  //自定义数据
        day.money = '暂无';  //自定义数据
    } else {
        day.money = day_my.text;
        day.disable = true;
    }
    //自定义 一天的样式
    props.children = (
        <div className="day">
            <span className="textNum">{day.text}</span>
            <span className="textMoney">{day.money}</span>
        </div>
    );
};

export default class CalendarComponent extends Component {
    render() {
        return (
            <div>
                <MultiMonthView startText="入住" endText="退房" monthNumber="1"
                    viewMoment="2019-05" onDayClick={onDayClick} rendDay={rendDay} />
                {/* <DatePicker startText="入住" endText="退房" monthNumber="1"
                    viewMoment="2019-05" onDayClick={onDayClick} rendDay={rendDay} /> */}
                <DatePicker viewMoment="2019-05" startText="入住" endText="退房" onDayClick={onDateClick} rendDay={rendDate} ></DatePicker>
            </div>
        )
    }
}