import Component from '../../../verve/Component';
import {IComponentNode} from '../../../verve/interfaces';
import { createNode, createText } from '../../../verve/Verve';

export default class Todo extends Component {
	constructor(props) {
		super(props);
	}
	
	render(): IComponentNode {
		return createNode({
			tagName: 'div',
			attributes: {
				class: 'Todo',
				style: 'margin-top: 30px'
			},
			handlers: {},
			children: [
				createText({value: 'Todo'})
			]
		});
	}
}
