import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';

export default class Button extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return Verve.createNode({
			tagName: 'button',
			attributes: {
				class: 'button',
			},
			handlers: {
				click: this.props.buttonClickHandler,
			},
			children: [
				Verve.createText({value: this.props.textValue}),
			],
		});
	}
}