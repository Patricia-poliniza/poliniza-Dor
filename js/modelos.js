/* Modelos 3D.
   Cada función arma un polinizador y devuelve un grupo de Three.js.
   Para usar tus propios modelos .glb, reemplaza el contenido de la función (ver LEEME.txt). */

/* =========================================
   MODELOS 3D DE LOS POLINIZADORES
   Cambia las rutas si tus archivos tienen
   nombres diferentes.
========================================= */

// 1. RUTAS DE TUS MODELOS 3D

/* Modelos 3D personalizados de los polinizadores */

// CAMBIA AQUÍ las rutas de tus archivos GLB
const RUTAS_MODELOS = [
  'modelos/abe.glb',
  'modelos/Colibri pico espada.glb',
  'modelos/murcielago.glb',
  'modelos/polilla.glb'
];

const cargadorGLB = new THREE.GLTFLoader();

function crearModeloGLB(ruta) {
  const grupo = new THREE.Group();

  cargadorGLB.load(
    ruta,

    function (resultado) {
      const modelo = resultado.scene;

      // Calcular tamaño y centro del modelo
      const caja = new THREE.Box3().setFromObject(modelo);
      const tamano = caja.getSize(new THREE.Vector3());
      const centro = caja.getCenter(new THREE.Vector3());

      const maximo = Math.max(tamano.x, tamano.y, tamano.z);

      if (maximo > 0) {
        const escala = 2.2 / maximo;

        modelo.scale.setScalar(escala);
        modelo.position.set(
          -centro.x * escala,
          -centro.y * escala,
          -centro.z * escala
        );
      }

      grupo.add(modelo);
    },

    undefined,

    function (error) {
      console.error('Error al cargar el modelo:', ruta, error);
    }
  );

  return grupo;
}

// Mantener el orden de los cuatro polinizadores
const MODELOS = RUTAS_MODELOS.map(function (ruta) {
  return function (L) {
    return crearModeloGLB(ruta);
  };
});

// Conectar con datos.js
A.forEach(function (polinizador, i) {
  polinizador.build = MODELOS[i];
});
