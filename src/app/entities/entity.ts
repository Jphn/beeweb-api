import { randomUUID } from 'crypto';

export abstract class Entity<T> {
	protected readonly _id: string;
	protected props: T;

	constructor(props: T, _id?: string) {
		_id = _id ?? randomUUID();

		this._id = _id;
		this.props = props;

		Object.freeze(this);
	}
}
