import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';
import {IComponentNode, IProps} from '../../../verve/interfaces';

export default class Button extends Component {
	constructor(props: IProps) {
		super(props);
	}
	
	render(): IComponentNode {
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