var mouse_resolution = 256;

function mouseCopy() {
	if ( THREE.CopyShader === undefined )
		console.error( "createMouseTexture relies on THREE.CopyShader" );

	var copyShader = THREE.CopyShader;

	var copyUniforms = THREE.UniformsUtils.clone( copyShader.uniforms );

	copyUniforms[ "opacity" ].value = 1.0;

	var materialCopy = new THREE.ShaderMaterial( {
		uniforms: copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.AdditiveBlending,
		transparent: true
	});
	copyUniforms[ "tDiffuse" ].value = mouse_texture_data;

	THREE.EffectComposer.quad.material = materialCopy;

	renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, mouse_texture, false);
}

function createMouseTexture(update) {
	mouse_texture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, 
		{ minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType } );

	var dl = mouse_resolution * mouse_resolution * 4;

	var data = new Float32Array(dl);					

	while(dl--) {
		data[dl] = 0.0;
	}

	mouse_texture_data = new THREE.DataTexture(data, mouse_resolution, mouse_resolution, THREE.RGBAFormat, THREE.FloatType);	
	mouseCopy();
}

function perturbMouseTexture(x,y) {
	// var gl = renderer.getContext();
	// var dl = mouse_resolution * mouse_resolution * 4;
	// while(dl--) {					
		// mouse_texture_data.image.data[dl] = 0.0;
	// }

	if (x && y) {
		mouse_texture_data.image.data[(y*mouse_resolution + x) * 4] = 1.0;
		mouse_texture_data.image.data[(y*mouse_resolution + x) * 4 + 3] = 1.0;
		// console.log(x, y, (y*mouse_resolution + x) );
	}
	mouse_texture_data.needsUpdate = true;
	mouseCopy();
}

function onMouseMove(event) {
	var x = parseInt(mouse_resolution*1.0*event.pageX / window.innerWidth), y = parseInt(mouse_resolution*1.0*event.pageY / window.innerHeight);
	perturbMouseTexture(x,y);
}

function onTouchMove(event) {
	event.preventDefault();
	var x = parseInt(mouse_resolution*1.0*event.targetTouches[0].pageX/ window.innerWidth), y = parseInt(mouse_resolution*1.0*event.targetTouches[0].pageY / window.innerHeight);
	perturbMouseTexture(x,y);
}

document.addEventListener('touchstart', function () {
	document.addEventListener('touchmove', onTouchMove, false);
}, false);

document.addEventListener('touchend', function () {
	document.removeEventListener('touchmove', onTouchMove, false);
	var dl = mouse_resolution * mouse_resolution * 4;
	while(dl--) {
		mouse_texture_data.image.data[dl] = 0.0;
	}
	mouse_texture_data.needsUpdate = true;
}, false);
document.addEventListener('mousedown', function () {
	document.addEventListener('mousemove', onMouseMove, false);
}, false);

document.addEventListener('mouseup', function () {
	document.removeEventListener('mousemove', onMouseMove, false);
	var dl = mouse_resolution * mouse_resolution * 4;
	while(dl--) {					
		mouse_texture_data.image.data[dl] = 0.0;
	}
}, false);
