export default {
	type: 'object',

	required: ['temp', 'humidity', 'lux', 'atmosPressure', 'lat', 'lon'],

	additionalProperties: false,

	properties: {
		temp: { type: 'number' },
		humidity: { type: 'number' },
		lux: { type: 'number' },
		atmosPressure: { type: 'number' },
		lat: { type: 'number' },
		lon: { type: 'number' },
	},
} as const;
