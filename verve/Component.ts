import {IComponentNode, IComponentText, IProps} from './interfaces';
import { createText } from './Verve';

export default class Component {
	protected readonly props: IProps;
	
	constructor(props: IProps) {
		this.props = props;
	}
	
	render(): IComponentNode | IComponentText {
		return createText({value: 'Hello, Verve'});
	}
}
