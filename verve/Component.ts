import {IComponentNode, IComponentText, IProps} from './interfaces';
import Verve from './Verve';

export default class Component {
	protected readonly props: IProps;
	
	constructor(props: IProps) {
		this.props = props;
	}
	
	render(): IComponentNode | IComponentText {
		return Verve.createText({value: 'Hello, Verve'});
	}
}