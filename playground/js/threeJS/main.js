import * as THREE from './three.module.js';

			import Stats from './stats.module.js';

			let stats;

			let camera, scene, renderer;

			let objects;

			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

			document.addEventListener( 'mousemove', onDocumentMouseMove );

			init();
			animate();


			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1200;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				objects = [];

				const material = new THREE.MeshNormalMaterial();

				const loader = new THREE.BufferGeometryLoader();
				loader.load( 'suzanne_buffergeometry.json', function ( geometry ) {

					geometry.computeVertexNormals();

					for ( let i = 0; i < 5000; i ++ ) {

						const mesh = new THREE.Mesh( geometry, material );

						mesh.position.x = Math.random() * 8000 - 4000;
						mesh.position.y = Math.random() * 8000 - 4000;
						mesh.position.z = Math.random() * 8000 - 4000;
						mesh.rotation.x = Math.random() * 2 * Math.PI;
						mesh.rotation.y = Math.random() * 2 * Math.PI;
						mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50 + 100;

						objects.push( mesh );

						scene.add( mesh );

					}

				} );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) * 10;
				mouseY = ( event.clientY - windowHalfY ) * 10;

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .001;
				camera.position.y += ( - mouseY - camera.position.y ) * .001;
				camera.lookAt( scene.position );

				for ( let i = 0, il = objects.length; i < il; i ++ ) {

					objects[ i ].rotation.x += 0.01;
					objects[ i ].rotation.y += 0.02;

				}

				renderer.render( scene, camera );

			}