import Component from '../verve/Component';
import Counter from './components/Counter/Counter';
import Button from './components/Button/Button';
import Verve from '../verve/Verve';

export default class App extends Component {
	private readonly store;
	
	constructor(props) {
		super(props);
		
		this.store = Verve.createStore({
			count: 0,
		});
		
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
	}
	
	buttonClickHandler() {
		this.store.setState({...this.store.getState(), count: this.store.getState().count + 1});
	}
	
	render() {
		return Verve.createNode({
			tagName: 'div',
			attributes: {
				class: 'App'
			},
			handlers: {},
			children: [
				new Counter({value: this.store.getState().count}).render(),
				new Button({buttonClickHandler: this.buttonClickHandler}).render(),
			],
		});
	}
}