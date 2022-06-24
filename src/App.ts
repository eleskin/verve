import Component from '../verve/Component';
import Verve from '../verve/Verve';
import Counter from './components/Counter/Counter';

class App extends Component {
	store;
	
	constructor(props) {
		super(props);
		
		this.store = Verve.createStore({
			value: 0,
		});
	}
	
	render() {
		return Verve.createNode(
			'div',
			{
				class: 'text',
				style: 'border: 1px solid #000',
			},
			{},
			[
				new Counter({
					value: this.store.value, setValue: () => {
						this.store.value += 1;
						console.log(this.store.value);
					},
				}),
			],
		);
	}
}

export default App;