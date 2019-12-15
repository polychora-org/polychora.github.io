THREE.WASDControls = function (object, domElement) {
	this.object = object;

	this.enabled = true;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.speed = 0.1;

	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, W: 87, A: 65, S: 83, D: 68 };

	var scope=  this;

	function onKeyDown( event ) {
		if ( scope.enabled === false ) return;

		switch ( event.keyCode ) {
			case scope.keys.UP:
			case scope.keys.W:
				scope.object.position.z -= scope.speed;
				break;
			case scope.keys.BOTTOM:
			case scope.keys.S:
				scope.object.position.z += scope.speed;
				break;
			case scope.keys.LEFT:
			case scope.keys.A:
				scope.object.position.x -= scope.speed;
				break;
			case scope.keys.RIGHT:
			case scope.keys.D:
				scope.object.position.x += scope.speed;
				break;
		}
		console.log(scope.object.position.x, scope.object.position.y, scope.object.position.z);
	}
	this.domElement.addEventListener( 'keydown', onKeyDown, false );	
}

THREE.WASDControls.prototype = Object.create( THREE.EventDispatcher.prototype );
