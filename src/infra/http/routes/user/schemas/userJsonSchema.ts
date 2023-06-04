export default {
	type: 'object',

	required: ['firstName', 'lastName', 'email', 'password', 'isAdmin'],

	additionalProperties: false,

	properties: {
		firstName: { type: 'string', minLength: 4 },

		lastName: { type: 'string', minLength: 4 },

		email: { type: 'string', format: 'email' },

		password: {
			type: 'string',
			minLength: 8,
			maxLength: 14,
		},

		isAdmin: {
			type: 'boolean',
		},
	},
} as const;
