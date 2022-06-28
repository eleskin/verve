import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';
import {IComponentNode, IProps, IStore} from '../../../verve/interfaces';

export default class Form extends Component {
	private readonly store: IStore;
	
	constructor(props: IProps) {
		super(props);
		
		this.store = Verve.createStore({
			inputValue: '',
		});
		
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
	}
	
	inputChangeHandler(event: Event | any): void {
		this.store.setState({...this.store.getState(), inputValue: event.target.value});
	}
	
	render(): IComponentNode {
		return Verve.createNode({
			tagName: 'form',
			attributes: {},
			handlers: {},
			children: [
				Verve.createNode({
					tagName: 'input',
					attributes: {},
					handlers: {
						input: this.inputChangeHandler,
					},
					children: [],
				}),
				Verve.createNode({
					tagName: 'span',
					attributes: {},
					handlers: {},
					children: [
						Verve.createText({value: this.store.getState().inputValue}),
					],
				}),
			],
		});
	}
}