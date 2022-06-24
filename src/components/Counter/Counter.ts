import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';

class Counter extends Component {
	props;
	
	constructor(props) {
		super(props);
		this.props = props;
	}
	
	render() {
		return Verve.createNode(
			'output',
			{},
			{},
			[
				this.props.value,
				Verve.createNode(
					'button',
					{},
					{
						click: this.props.setValue
					},
					[
						'+1'
					]
				)
			]
		);
	}
}

export default Counter;