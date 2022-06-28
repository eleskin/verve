import Component from './Component';
import {IComponentNode, IObject} from './interfaces';

export default class Verve {
	private static _component: Component;
	private static _selector: string;
	private static _prevDOMState: IComponentNode;
	private static _symbols = [];
	private static _symbolsIndex: number = 0;
	
	private static deepEqualNode(object1: IObject, object2: IObject) {
		let isEqual: boolean = true;
		
		if (Object.entries(object1.attributes).length !== Object.entries(object2.attributes).length) isEqual = false;
		if (Object.entries(object1.handlers).length !== Object.entries(object2.handlers).length) isEqual = false;
		if (object1.children.length !== object2.children.length) isEqual = false;
		
		Object.entries(object1.attributes).forEach((attribute, index) => {
			const [attributeName1, attributeValue1] = attribute;
			const [attributeName2, attributeValue2] = Object.entries(object2.attributes)[index];
			
			if (attributeName1 !== attributeName2) isEqual = false;
			if (attributeValue1 !== attributeValue2) isEqual = false;
		});
		
		Object.entries(object1.handlers).forEach((handler, index) => {
			const [handlerName1, handlerValue1] = handler;
			const [handlerName2, handlerValue2] = Object.entries(object2.handlers)[index];
			
			if (handlerName1 !== handlerName2) isEqual = false;
			if (handlerValue1 !== handlerValue2) isEqual = false;
		});
		
		object1.children.forEach((child, index) => {
			const objectChild1 = child;
			const objectChild2 = object2.children[index];
			
			if (!this.deepEqual(objectChild1, objectChild2)) isEqual = this.deepEqual(objectChild1, objectChild2);
		});
		
		return isEqual;
	}
	
	private static deepEqualTextNode(object1, object2) {
		let isEqual = true;
		
		if (object1.value !== object2.value) isEqual = false;
		
		if (!isEqual) {
			const [changedElement] = this._symbols.filter((element) => element.symbol === object1.symbol);
			changedElement.element.nodeValue = object2.value;
		}
		
		return isEqual;
	}
	
	private static deepEqual(object1, object2) {
		if (object1.tagName !== object2.tagName) return false;
		
		return object1.tagName === '#text' ? this.deepEqualTextNode(object1, object2) : this.deepEqualNode(object1, object2);
	}
	
	public static generateDOM(virtualDOM) {
		const element = document.createElement(virtualDOM.tagName);
		
		this._symbols.push({symbol: virtualDOM.symbol, element});
		
		const attributes = Object.entries(virtualDOM.attributes);
		attributes.forEach(([attributeName, attributeValue]) => {
			element.setAttribute(attributeName, attributeValue);
		});
		
		const handlers = Object.entries(virtualDOM.handlers);
		handlers.forEach(([handlerName, handlerValue]) => {
			element.addEventListener(handlerName, handlerValue);
		});
		
		const children = virtualDOM.children;
		children.forEach((child) => {
			if (child.tagName === '#text') {
				const textElement = document.createTextNode(child.value);
				element.append(textElement);
				this._symbols.push({symbol: child.symbol, element: textElement});
			} else {
				const node = this.generateDOM(child);
				element.append(node);
			}
		});
		
		return element;
	}
	
	public static mountDOM(DOM) {
		const element = document.querySelector(this._selector);
		element.append(DOM);
	}
	
	public static rerender(virtualDOM) {
		this._symbolsIndex = 0;
		const renderedState = virtualDOM.render();
		const isEqualDOM = this.deepEqual(this._prevDOMState, renderedState);
		
		if (!isEqualDOM) {
			this._prevDOMState = renderedState;
		}
	}
	
	public static render(selector, component) {
		this._component = component;
		this._selector = selector;
		this._prevDOMState = component.render();
		
		const DOM = this.generateDOM(this._prevDOMState);
		
		this.mountDOM(DOM);
		
		return component.render();
	}
	
	public static createNode({tagName, attributes, handlers, children}) {
		return {symbol: this._symbolsIndex++, tagName, attributes, handlers, children};
	}
	
	public static createText({value}) {
		return {symbol: this._symbolsIndex++, tagName: '#text', value};
	}
	
	public static createStore(initialState) {
		let state = initialState;
		
		return {
			getState: () => state,
			setState: (newState) => {
				state = newState;
				this.rerender(this._component);
				return state;
			},
		};
	}
}