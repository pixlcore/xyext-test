// xyOps Test Extension

var pkg = require('./package.json');

module.exports = {

	init() {
		this.logDebug(5, "Hello from test extension!", { foo: 42, version: pkg.version });
		
		this.xy.on( 'configResponse', function(resp) {
			resp.EXTJOE = { hi: 2 };
		} );
		
		this.xy.on( 'configPayload', function() {
			return `function CUSTOMJOE() { console.log(42); };`;
		} );
	},
	
	handleRequest(args, callback) {
		this.logDebug(5, "Hey, we're inside a request! " + args.request.url);
		callback({ code: 0, yo: "yoyo" });
	},
	
	client: {
		foo: "bar on client-side!",
		init: function() {
			// this actual function is serialized (toString) and sent to the client, where it is rehydrated
			console.log("This should show up in the BROWSER console! ", this.foo);
			this.customFunc(44, 55);
		},
		customFunc: function(a, b) {
			console.log("Custom function called!", a, b);
		}
	}

};

