

function Producto(nombre, tipo, precio, imagenUrl) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio = precio;
    this.imagenUrl = imagenUrl;
}

let producto1 = new Producto ("Almohadon","pana",18000,"img/almodadon-pana.jpg")
let producto2 = new Producto ("Almohadon","gabardina",15000,"img/almohadon-gabardina.jpg")
let producto3 = new Producto ("Cortinas","gasa",75000,"img/cortinas-gasa.jpg")
let producto4 = new Producto ("Cortinas","lienzo",45000,"img/cortinas-lienzo.jpg")
let producto5 = new Producto ("Cortinas","Voiles",60000,"img/cortinas-voile.jpg")
let producto6 = new Producto ("Florero","vidrio",23000,"img/florero-vidrio.jpg")
let producto7 = new Producto ("Globo","madera",60000,"img/globo.jpg")
let producto8 = new Producto ("Lampara","metal",95000,"img/lampara.jpg")
let producto9 = new Producto ("Mantel","tussor",10000,"img/mantel.jpg")
let producto10 = new Producto ("Set baño","ceramica",22000,"img/set-baño.jpg")
let producto11 = new Producto ("Cuadros","madera",10000,"img/set-cuadros.jpg")
let producto12 = new Producto ("Velas","vidrio",10000,"img/velas.jpg")

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemsCarritoContainer = document.getElementById('items-carrito');

    itemsCarritoContainer.innerHTML = '';

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>${producto.tipo} - $${producto.precio}</p>`;
        itemsCarritoContainer.appendChild(item);
    });

    document.getElementById('carrito-container').style.display = 'block';
}

function borrarCarrito() {
    localStorage.removeItem('carrito'); 
    document.getElementById('items-carrito').innerHTML = ''; 
}

function mostrarProductos(productosFiltrados= null) {
    const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12];
    const container = document.getElementById('productos-container');
    container.innerHTML = '';
    const listaParaMostrar = productosFiltrados || productos;

    listaParaMostrar.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';

        const imagen = document.createElement('img');
        imagen.src = producto.imagenUrl;
        imagen.alt = `Imagen de ${producto.nombre}`;
        card.appendChild(imagen);

        const nombre = document.createElement('h3');
        nombre.textContent = producto.nombre;
        card.appendChild(nombre);

        const tipo = document.createElement('p');
        tipo.textContent = producto.tipo;
        card.appendChild(tipo);

        const precio = document.createElement('p');
        precio.textContent = `Precio: ${producto.precio}`;
        card.appendChild(precio);

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al Carrito';
        botonAgregar.onclick = function() {
            agregarAlCarrito(producto);
            console.log(`Producto agregado: ${producto.nombre}`);
        };
        card.appendChild(botonAgregar);

        container.appendChild(card);
    });
}

function filtrarProductos(terminoBusqueda) {
    const productos = [producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8,producto9,producto10,producto11,producto12];
    if (!terminoBusqueda.trim()) {
        return productos;
    }
    return productos.filter(producto => producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) || producto.tipo.toLowerCase().includes(terminoBusqueda.toLowerCase()));
}

document.getElementById('boton-buscar').addEventListener('click', function() {
    const terminoBusqueda = document.getElementById('ingreso-busqueda').value;
    const productosFiltrados = filtrarProductos(terminoBusqueda);

    mostrarProductos(productosFiltrados);
});

document.getElementById('boton-ingresar').addEventListener('click', function() {
    const nombreUsuario = document.getElementById('nombre-usuario').value;
    const correoElectronico = document.getElementById('correo-electronico').value;

    if (!nombreUsuario.trim()) {
        alert('Por favor, ingresa tu nombre de usuario.');
        return;
    }
    if (!correoElectronico.trim() || !correoElectronico.includes('@') || !correoElectronico.includes('.')) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    document.getElementById('login-container').style.display = 'none';
    document.getElementById('container-busqueda').style.display = 'flex';

    mostrarProductos();

    document.getElementById('ver-carrito').style.display = 'block';
});

document.getElementById('ver-carrito').addEventListener('click', mostrarCarrito);
document.getElementById('boton-borrar-carrito').addEventListener('click', borrarCarrito);

document.getElementById('cerrar-carrito').addEventListener('click', function() {
    document.getElementById('carrito-container').style.display = 'none';
});

