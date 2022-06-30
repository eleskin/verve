import Component from '../../../verve/Component';
import {IComponentNode} from '../../../verve/interfaces';
import Verve from '../../../verve/Verve';

export default class Todo extends Component {
	constructor(props) {
		super(props);
	}
	
	render(): IComponentNode {
		return Verve.createNode({
			tagName: 'div',
			attributes: {
				class: 'Todo',
				style: 'margin-top: 30px'
			},
			handlers: {},
			children: [
				Verve.createText({value: 'Todo'})
			]
		});
	}
}