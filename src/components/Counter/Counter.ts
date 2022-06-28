import Component from '../../../verve/Component';
import Verve from '../../../verve/Verve';
import {IComponentText, IProps} from '../../../verve/interfaces';

export default class Counter extends Component {
	constructor(props: IProps) {
		super(props);
	}
	
	render(): IComponentText {
		return Verve.createText({value: this.props.value});
	}
}