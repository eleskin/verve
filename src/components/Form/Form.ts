import Component from '../../../verve/Component';
import { createNode, createStore, createText } from '../../../verve/Verve';
import {IComponentNode, IProps, IStore} from '../../../verve/interfaces';

export default class Form extends Component {
	private readonly store: IStore;
	
	constructor(props: IProps) {
		super(props);
		
		this.store = createStore({
			inputValue: '',
		});
		
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
	}
	
	inputChangeHandler(event: Event | any): void {
		this.store.setState({...this.store.getState(), inputValue: event.target.value});
	}
	
	render(): IComponentNode {
		return createNode({
			tagName: 'form',
			attributes: {},
			handlers: {},
			children: [
				createNode({
					tagName: 'input',
					attributes: {},
					handlers: {
						input: this.inputChangeHandler,
					},
					children: [],
				}),
				createNode({
					tagName: 'span',
					attributes: {},
					handlers: {},
					children: [
						createText({value: this.store.getState().inputValue}),
					],
				}),
			],
		});
	}
}
