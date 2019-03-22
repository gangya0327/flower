import React from 'react'

export default class CheckboxItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked,
            name: props.name
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.checked !== prevProps.checked) {
            this.setState({
                checked: nextProps.checked
            })
        }
    }

    handleChange() {
        const { checked, name } = this.state
        this.setState({
            checked: !checked
        }, function () {
            this.props.handleItemChange({ name: name, checked: !checked });
        })
    }

    render() {
        const { checked, name } = this.state
        return (
            <div>
                <label className="checkbox-item"><input type="checkbox" checked={checked} onChange={this.handleChange} />{name}</label>
            </div>
        )
    }
}