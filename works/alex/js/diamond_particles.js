function makeParticles() {
  var particlesLength = 70000;

  particles = new THREE.Geometry();

  function newpos( x, y, z ) {
    return new THREE.Vector3( x, y, z );
  }


  Pool = {
    __pools: [],

    // Get a new Vector
    get: function() {
      if ( this.__pools.length > 0 ) {
        return this.__pools.pop();
      }

      console.log( "pool ran out!" )
      return null;
    },

    // Release a vector back into the pool
    add: function( v ) {
      this.__pools.push( v );
    }
  };

  for (var i = 0; i < particlesLength; i ++ ) {
    particles.vertices.push( newpos( Math.random() * 200 - 100, Math.random() * 100 + 150, Math.random() * 50 ) );
    Pool.add( i );
  }


        var x = 0, y = 0;

  var setTargetParticle = function() {
    var target = Pool.get();
    values_size[ target ] = Math.random() * 2 + 0.1;

    return target;

  };

  // pointLight = new THREE.PointLight( 0xffffff, 2, 300 );
  // pointLight.position.set( 0, 0, 0 );
  // scene.add( pointLight );

  var hue = 0;
  timeOnShapePath = 0;
  var onParticleCreated = function( p ) {
    var position = p.position;
    p.target.position = position;

    var target = p.target;

    if ( target ) {

      // console.log(target,particles.vertices[target]);
      // values_size[target]
      // values_color[target]

      // hue += 0.0003 * delta;
      // if ( hue > 1 ) hue -= 1;

      // var p = {x: Math.random() * 5, y: Math.random() * 5};
      // emitterpos.x = p.x - 1;
      // emitterpos.y = -p.y + 4;
      emitterpos.x = Math.random() * 4 - 2;
      emitterpos.y = Math.random() * 4 - 2;

      // // pointLight.position.copy( emitterpos );
      // pointLight.position.x = emitterpos.x;
      // pointLight.position.y = emitterpos.y;
      // pointLight.position.z = 6;

      particles.vertices[ target ] = p.position;

      values_color[ target ].setRGB(1.0, 1.0, 1.0) //.setHSL( hue, 0.6, 0.1 );

      // pointLight.color.setHSL( hue, 0.8, 0.5 );

    };

  };

  var onParticleDead = function( particle ) {

    var target = particle.target;

    if ( target ) {
      // Hide the particle

      values_color[ target ].setRGB( 0, 0, 0 );
      particles.vertices[ target ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );

      // Mark particle system as available by returning to pool

      Pool.add( particle.target );

    }
  };

  function generateSprite() {

          var canvas = document.createElement( 'canvas' );
          canvas.width = 128;
          canvas.height = 128;

          var context = canvas.getContext( '2d' );


          // Just a square, doesnt work too bad with blur pp.
          context.fillStyle = "white";
          context.strokeStyle = "white";
          context.fillRect(0, 0, 63, 63) ;
          return canvas;
        }

// shaderMaterial = new THREE.ParticleBasicMaterial();
  // shaderMaterial = THREE.DynamicParticles.particleShaderMaterial();

        attributes = {
          size:  { type: 'f', value: [] },
          pcolor: { type: 'c', value: [] }
        };

        var sprite = generateSprite() ;

        texture = new THREE.Texture( sprite );
        texture.needsUpdate = true;

        uniforms = {

          // texture:   { type: "t", value: texture }

        };
        var shaderMaterial = new THREE.ShaderMaterial( {

          uniforms:     uniforms,
          attributes:     attributes,

          vertexShader:  ["attribute float size;",
                        "attribute vec3 customColor;",

        "varying vec3 vColor;",
        "void main() {",
          "vColor = customColor;",
          "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
          "gl_PointSize = size;",//  * ( 200.0 / length( mvPosition.xyz ) );",
          "gl_Position = projectionMatrix * mvPosition;",
        "}",
          ].join("\n"),
          fragmentShader: [ // "uniform sampler2D texture;",
        "varying vec3 vColor;",
        "void main() {",
          // "vec4 outColor = texture2D( texture, gl_PointCoord );",
          // "gl_FragColor = outColor * vec4( vColor, 1.0 );",
          "gl_FragColor = vec4( vColor, 1.0 );",
        "}",
          ].join("\n"),

          blending:     THREE.AdditiveBlending,
          depthWrite:   false,
          transparent:  true

        });


  particleCloud = new THREE.ParticleSystem( particles, shaderMaterial );

  particleCloud.dynamic = true;
  // particleCloud.sortParticles = true;

  shaderMaterial.attributes = {

    size:  { type: 'f', value: [] },
    customColor: { type: 'c', value: [] }

  };

  attributes = shaderMaterial.attributes;
  vertices = particleCloud.geometry.vertices;
  values_size = attributes.size.value;
  values_color = attributes.customColor.value;

  for( var v = 0; v < vertices.length; v ++ ) {
    values_size[ v ] = 5;
    values_color[ v ] = new THREE.Color( 0x000000 );
    particles.vertices[ v ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );
  }

  scene.add( particleCloud );
  particleCloud.y = 8;
  var engineLoopUpdate = function() {

  };

  sparksEmitter = new SPARKS.Emitter( new SPARKS.SteadyCounter( 1000 ) );

  emitterpos = new THREE.Vector3( 0, 0, 10 );

  sparksEmitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
  sparksEmitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
  sparksEmitter.addInitializer( new SPARKS.Target( null, setTargetParticle ) );


  sparksEmitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( new THREE.Vector3( 0, -0.1, 0.1 ) ) ) );

  sparksEmitter.addAction( new SPARKS.Age(function (x) { return x;}));
  sparksEmitter.addAction( new SPARKS.Accelerate( 0, 0, 0.1 ) );
  sparksEmitter.addAction( new SPARKS.Move() );
  sparksEmitter.addAction( new SPARKS.RandomDrift( 5, 5, 5 ) );


  sparksEmitter.addCallback( "created", onParticleCreated );
  sparksEmitter.addCallback( "dead", onParticleDead );
  sparksEmitter.start();
}