import Component from '../../../verve/Component';
import { createText } from '../../../verve/Verve';
import {IComponentText, IProps} from '../../../verve/interfaces';

export default class Counter extends Component {
	constructor(props: IProps) {
		super(props);
	}
	
	render(): IComponentText {
		return createText({value: this.props.value});
	}
}
