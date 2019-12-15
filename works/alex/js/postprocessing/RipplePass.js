/**
 * @author Chris Johnson-Roberson / http://chrisjr.org/
 * based on BloomPass by alteredq
 */

THREE.RipplePass = function (mouseBuffer, mouse_resolution) {

	var resolution = mouse_resolution;

	var screen_pixel = new THREE.Vector2(1.0/window.innerWidth, 1.0/window.innerHeight);

	// render targets
	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, type: THREE.FloatType };
	this.renderTargetX = new THREE.WebGLRenderTarget( resolution, resolution, pars );

	this.mouseBuffer = mouseBuffer;

	if ( THREE.RippleDataShader === undefined )
		console.error( "THREE.RipplePass relies on THREE.RippleDataShader" );

	var rippleDataShader = THREE.RippleDataShader;

	this.rippleDataUniforms = THREE.UniformsUtils.clone( rippleDataShader.uniforms );

	this.materialRippleData = new THREE.ShaderMaterial({
		uniforms: this.rippleDataUniforms,
		vertexShader:  rippleDataShader.vertexShader,
		fragmentShader: rippleDataShader.fragmentShader,
	});

	this.rippleDataUniforms['pixel'].value = screen_pixel;

	// refraction material

	if ( THREE.RefractionShader === undefined )
		console.error( "THREE.RipplePass relies on THREE.RefractionShader" );

	var refractionShader = THREE.RefractionShader;

	this.refractionUniforms = THREE.UniformsUtils.clone( refractionShader.uniforms );

	this.refractionUniforms['pixel'].value = screen_pixel;

	this.materialRefraction = new THREE.ShaderMaterial({
		uniforms: this.refractionUniforms,
		vertexShader:  refractionShader.vertexShader,
		fragmentShader: refractionShader.fragmentShader,
	});

	// copy material

	if ( THREE.CopyShader === undefined )
		console.error( "THREE.BloomPass relies on THREE.CopyShader" );

	var copyShader = THREE.CopyShader;

	this.copyUniforms = THREE.UniformsUtils.clone( copyShader.uniforms );

	this.copyUniforms[ "opacity" ].value = 1.0;

	this.materialCopy = new THREE.ShaderMaterial( {
		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.AdditiveBlending,
		transparent: true
	});

	this.enabled = true;
	this.needsSwap = false;
	this.clear = false;

};

THREE.RipplePass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		THREE.EffectComposer.quad.material = this.materialRippleData;
		this.rippleDataUniforms[ "tDiffuse" ].value = this.mouseBuffer;

		renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, this.renderTargetX, true );

		THREE.EffectComposer.quad.material = this.materialCopy;

		this.copyUniforms[ "tDiffuse" ].value = this.renderTargetX;
		renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, this.mouseBuffer, true );

		// renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera);
		// return;	

		THREE.EffectComposer.quad.material = this.materialRefraction;

		this.refractionUniforms[ "tDiffuse" ].value = readBuffer;
		this.refractionUniforms[ "buffer" ].value = this.mouseBuffer;

		if ( this.renderToScreen ) {
			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );
		} else {
			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, writeBuffer, false );
		}
	}

};