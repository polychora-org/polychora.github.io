/**
 * @author Chris Johnson-Roberson / http://chrisjr.org/
 *
 * Ripple Shader
 * based on shader by Patricio Gonzalez-Vivo
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

THREE.RippleShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"uDamping":   { type: "f", value: 0.005 },
		"tPrevBuffer": { type: "t", value: null },
	},
	vertexShader: [
		"varying vec2 vUv;",
		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join("\n"),

	fragmentShader: [
		"uniform sampler2D tDiffuse;",
		"uniform float uDamping;", // smoothing value between 0.0 - 1.0

		"uniform sampler2D tPrevBuffer;", // previous buffer

		"varying vec2 vUv;",

		"vec2 offset[4];",                   // this is going to be the neighbors matrix

		"void main(){",
			"offset[0] = vec2(-1.0, 0.0);",
			"offset[1] = vec2(1.0, 0.0);",
			"offset[2] = vec2(0.0, 1.0);",
			"offset[3] = vec2(0.0, -1.0);",

		// "sum" is going to store the total value of the neighbors pixels
		//
		"vec3 sum = vec3(0.0);",
		"for (int i = 0; i < 4 ; i++){",
		  "sum += texture2D(tDiffuse, vUv + offset[i]).rgb;",
		"}",

		// make an average of this total
		//
		"sum = sum / 4.0;",

		// calculate the diference between that average and the value of the center pixel 
		// this is like adding the velocity
		//
		"sum = sum * 2.0 - texture2D(tPrevBuffer, vUv).rgb;",

		// smooth this value
		//
		"sum = sum * uDamping;",

		// write this information on the other texture ( buffer )
		//
		"gl_FragColor = vec4(sum, 1.0);",
		"}"
	].join("\n")
};
