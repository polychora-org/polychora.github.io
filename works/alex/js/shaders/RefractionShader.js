/**
 * @author Chris Johnson-Roberson / http://chrisjr.org/
 *
 * Refraction Shader
 * from http://bantherewind.com/wrap-your-mind-around-your-gpu 
 * by Stephen Schieberl
 *
 */

THREE.RefractionShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"buffer": { type: "t", value: null },
		"pixel":   { type: "v2", value: null} //new THREE.Vector2(1.0/window.innerWidth, 1.0/window.innerHeight)},
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
		"uniform sampler2D buffer;",
		"uniform vec2 pixel;",
		"varying vec2 vUv;",
		"void main( void )",
		"{",
		"vec2 above = texture2D( buffer, vUv + vec2( 0.0, -pixel.y ) ).rg;",
		"float x = above.g - texture2D( buffer, vUv + vec2( pixel.x, 0.0 ) ).g;",
		"float y = above.r - texture2D( buffer, vUv + vec2( 0.0, pixel.y ) ).r;",
		"gl_FragColor = texture2D( tDiffuse, vUv + vec2( x, y ) );",
		"}"
	].join("\n")
};
