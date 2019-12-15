/**
 * @author Chris Johnson-Roberson / http://chrisjr.org/
 *
 * Ripple Data Shader
 * from http://bantherewind.com/wrap-your-mind-around-your-gpu 
 * by Stephen Schieberl
 */

THREE.RippleDataShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"pixel":   { type: "v2", value: null } // new THREE.Vector2(1.0/window.innerWidth, 1.0/window.innerHeight)},
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
		"uniform vec2 pixel;",
		"varying vec2 vUv;",
		"const float dampen = 0.983;",
		"const float power = 1.5;",
		"const float speed = 1.0;",
		"float getSpring( float height, vec2 position, float factor )",
			"{",
				"return ( texture2D( tDiffuse, position ).r - height ) * factor;",
			"}",
		"void main( void )",
		"{",
			"vec2 kernel = pixel * speed;",
			"vec4 color = texture2D( tDiffuse, vUv );",
			"float height = color.r;",
			"float vel = color.g;",
			// "vel += getSpring( height, vUv + kernel * vec2( 1.0, 0.0 ), 0.25 * power );",
			// "vel += getSpring( height, vUv + kernel * vec2( 0.0, 1.0 ), 0.25 * power );",
			// "vel += getSpring( height, vUv + kernel * vec2( -1.0, 0.0 ), 0.25 * power );",
			// "vel += getSpring( height, vUv + kernel * vec2( 0.0, -1.0 ), 0.25 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 2.0, 3.0 ), 0.0022411859348636983 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 0.0, 3.0 ), 0.0056818181818181820 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -2.0, 3.0 ), 0.0022411859348636983 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 2.0, 2.0 ), 0.0066566640639421000 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 0.0, 2.0 ), 0.0113636363636363640 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -2.0, 2.0 ), 0.0066566640639421000 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 3.0, 1.0 ), 0.0047597860217705710 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 1.0, 1.0 ), 0.0146919683956074150 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -1.0, 1.0 ), 0.0146919683956074150 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -3.0, 1.0 ), 0.0047597860217705710 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 2.0, 0.0 ), 0.0113636363636363640 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -2.0, 0.0 ), 0.0113636363636363640 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 3.0, -1.0 ), 0.0047597860217705710 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 1.0, -1.0 ), 0.0146919683956074150 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -1.0, -1.0 ), 0.0146919683956074150 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -3.0, -1.0 ), 0.0047597860217705710 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 2.0, -2.0 ), 0.0066566640639421000 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 0.0, -2.0 ), 0.0113636363636363640 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -2.0, -2.0 ), 0.0066566640639421000 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 2.0, -3.0 ), 0.0022411859348636983 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( 0.0, -3.0 ), 0.0056818181818181820 * power );",
			"vel += getSpring( height, vUv + kernel * vec2( -2.0, -3.0 ), 0.0022411859348636983 * power );",
			"height += vel;",
			"vel *= dampen;",
			"gl_FragColor = clamp(vec4( height, vel, 0.0, 1.0 ), 0.0, 0.99);",
		"}"
	].join("\n")
};
