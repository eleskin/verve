export interface IProps {
	[key: string]: any;
}

export interface IComponentText {
	tagName: string;
	value: string;
}

export interface IComponentNode {
	tagName: string;
	attributes: {
		[key: string]: string;
	};
	handlers: {
		[key: string]: Function;
	};
	children: IComponentNode[] | IComponentText[];
}

export interface IStore {
	setState: Function;
	getState: Function;
}

export interface IObject {
	[key: string]: any;
}