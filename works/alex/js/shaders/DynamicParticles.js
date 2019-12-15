/**
 * @author Chris Johnson-Roberson / http://chrisjr.org/
*/


THREE.DynamicParticleShader = {
	uniforms: {
		// "tDiffuse": { type: "t", value: null  },
		"opacity": { type: "f", value: 1.0  },
	},
	attributes: {
		size: {	type: 'f', value: null },
		customColor: { type: 'c', value: null }
	},
	vertexShader: [
		"attribute float size;",
		"attribute vec3 customColor;",
		"varying vec3 vColor;",
		"void main() {",
			"vColor = customColor;",
			"gl_PointSize = size;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join("\n"),

	fragmentShader: [
		"uniform sampler2D tDiffuse;",
		"uniform float opacity;",
		"varying vec3 vColor;",
		"void main( void )",
		"{",
		"gl_FragColor = vec4(vColor, opacity);",
		// "gl_FragColor = gl_FragColor * texture2D(tDiffuse, vUv);",
		"}"
	].join("\n")
};

THREE.DynamicParticles = {
	particleShaderMaterial: function () {
		var uniforms = THREE.UniformsUtils.clone(THREE.DynamicParticleShader.uniforms);
		// uniforms['tDiffuse'].value = THREE.ImageUtils.loadTexture( "images/particle.png");
		return new THREE.ShaderMaterial( {
			uniforms: 		uniforms,
			attributes:     THREE.DynamicParticleShader.attributes,
			vertexShader:   THREE.DynamicParticleShader.vertexShader,
			fragmentShader: THREE.DynamicParticleShader.fragmentShader,
			blending: 		THREE.AdditiveBlending,
			depthTest: 		false,
			transparent:	true,
		});
	}
};
