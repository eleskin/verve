import Component from '../verve/Component';
import Counter from './components/Counter/Counter';
import Button from './components/Button/Button';
import Verve from '../verve/Verve';
import Switcher from './components/Switcher/Switcher';
import Form from './components/Form/Form';
import {IComponentNode, IProps, IStore} from '../verve/interfaces';
import Todo from './components/Todo/Todo';

export default class App extends Component {
	private readonly store: IStore;
	private readonly SwitcherComponent: Switcher;
	private readonly FormComponent: Form;
	private readonly TodoComponent: Todo;
	
	constructor(props: IProps) {
		super(props);
		
		this.store = Verve.createStore({
			count: 0,
		});
		
		this.SwitcherComponent = new Switcher({});
		this.FormComponent = new Form({});
		this.TodoComponent = new Todo({});
		
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
	}
	
	buttonClickHandler(): void {
		this.store.setState({...this.store.getState(), count: this.store.getState().count + 1});
	}
	
	render(): IComponentNode {
		return Verve.createNode({
			tagName: 'div',
			attributes: {
				class: 'App',
			},
			handlers: {},
			children: [
				new Counter({value: this.store.getState().count}).render(),
				new Button({
					value: this.store.getState().count,
					buttonClickHandler: this.buttonClickHandler,
					textValue: this.store.getState().count % 2 ? 'Нечётное' : 'Чётное',
				}).render(),
				this.SwitcherComponent.render(),
				this.FormComponent.render(),
				this.TodoComponent.render()
			],
		});
	}
}