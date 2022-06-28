import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';
import Button from '../Button/Button';
import {IComponentNode, IProps, IStore} from '../../../verve/interfaces';

export default class Switcher extends Component {
	private readonly store: IStore;
	
	constructor(props: IProps) {
		super(props);
		
		this.store = Verve.createStore({
			isLarge: false,
		});
		
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
	}
	
	buttonClickHandler(): void {
		this.store.setState({...this.store.getState(), isLarge: !this.store.getState().isLarge});
	}
	
	render(): IComponentNode {
		return Verve.createNode({
			tagName: 'div',
			attributes: {},
			handlers: {},
			children: [
				new Button({textValue: 'Переключить', buttonClickHandler: this.buttonClickHandler}).render(),
				this.store.getState().isLarge ?
					Verve.createText({value: 'Большой текст'}) :
					Verve.createText({value: 'Маленький текст'}),
			],
		});
	}
}