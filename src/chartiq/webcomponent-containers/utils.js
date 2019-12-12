import { CIQ } from 'chartiq/js/components';

function patchClass(source, target) {
	Object.getOwnPropertyNames(source.prototype).forEach(property => {
		const propertyDescriptor = Object.getOwnPropertyDescriptor(
			source.prototype,
			property
		);
		Object.defineProperty(target.prototype, property, propertyDescriptor);
	});
}
