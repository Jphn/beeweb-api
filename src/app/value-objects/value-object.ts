export abstract class ValueObject<T> {
	protected props: T;

	constructor(props: T) {
		this.props = props;

		Object.freeze(this);
	}
}
