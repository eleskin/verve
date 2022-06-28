import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';
import Button from '../Button/Button';

export default class Switcher extends Component {
	private readonly store;
	
	constructor(props) {
		super(props);
		
		this.store = Verve.createStore({
			isLarge: false,
		});
		
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
	}
	
	buttonClickHandler() {
		this.store.setState({...this.store.getState(), isLarge: !this.store.getState().isLarge});
	}
	
	render() {
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