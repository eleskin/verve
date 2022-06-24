import Component from './Component';

class Verve {
	private static rootComponent;
	private static rootSelector;
	
	static render(selector: string, component) {
		const element: HTMLElement = document.querySelector(selector);
		const renderedComponent = (new component).render();
		
		element.innerText = '';
		
		this.rootSelector = selector;
		this.rootComponent = component;
		
		element.append(renderedComponent);
	}
	
	static createNode(tagName, attributes, handlers, children) {
		const element = document.createElement(tagName);
		
		Object.entries(attributes).forEach((attribute) => {
			const [attributeName, attributeValue] = attribute;
			
			element.setAttribute(attributeName, attributeValue);
		});
		
		Object.entries(handlers).forEach((handler) => {
			const [handlerName, handlerValue] = handler;
			
			element.addEventListener(handlerName, handlerValue);
		});
		
		children.forEach((child) => {
			if (child instanceof Component) {
				element.append(child.render());
			} else {
				element.append(child);
			}
		});
		
		return element;
	}
	
	static createStore(initialState) {
		return new Proxy(initialState, {
			get(target, prop: any, receiver) {
				return Reflect.get(target, prop, receiver); // (1)
			},
			set: (target, prop: any, val, receiver) => {
				this.render(this.rootSelector, this.rootComponent);
				return Reflect.set(target, prop, val, receiver); // (2)
			},
		});
	}
}

export default Verve;