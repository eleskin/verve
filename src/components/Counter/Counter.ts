import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';

export default class Counter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return Verve.createText({value: this.props.value});
	}
}