import Component from '../../../verve/Component';
import { createNode, createStore, createText } from '../../../verve/Verve';
import Button from '../Button/Button';
import {IComponentNode, IProps, IStore} from '../../../verve/interfaces';

export default class Switcher extends Component {
	private readonly store: IStore;
	
	constructor(props: IProps) {
		super(props);
		
		this.store = createStore({
			isLarge: false,
		});
		
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
	}
	
	buttonClickHandler(): void {
		this.store.setState({...this.store.getState(), isLarge: !this.store.getState().isLarge});
	}
	
	render(): IComponentNode {
		return createNode({
			tagName: 'div',
			attributes: {},
			handlers: {},
			children: [
				new Button({textValue: 'Переключить', buttonClickHandler: this.buttonClickHandler}).render(),
				this.store.getState().isLarge ?
					createText({value: 'Большой текст'}) :
					createText({value: 'Маленький текст'}),
			],
		});
	}
}
