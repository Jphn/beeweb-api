export default {
	type: 'object',

	required: ['temp', 'humidity', 'noise', 'fullWeight', 'honeyWeight'],

	additionalProperties: false,

	properties: {
		temp: { type: 'number' },
		humidity: { type: 'number' },
		noise: { type: 'number' },
		fullWeight: { type: 'number' },
		honeyWeight: { type: 'number' },
	},
} as const;
