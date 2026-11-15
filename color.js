var svg = document.getElementById('tenis');
var partes = svg.querySelectorAll('.parte');
var paleta = document.getElementById('paleta');
var selector = document.getElementById('personalizado');
var galeria = document.getElementById('galeria');
var CLAVE = 'panam_galeria';

var colorActual = '#e63946';
var guardados = [];

/* Elegir colores  */
paleta.addEventListener('click', function (e) {
    var boton = e.target.closest('.color');
    if (!boton) return;
    colorActual = boton.getAttribute('data-color');
    paleta.querySelectorAll('.color').forEach(function (b) { b.classList.remove('activo'); });
    boton.classList.add('activo');
});

selector.addEventListener('input', function () {
    colorActual = selector.value;
    paleta.querySelectorAll('.color').forEach(function (b) { b.classList.remove('activo'); });
});

/* pintar */
partes.forEach(function (p) {
    p.addEventListener('click', function () {
        p.setAttribute('fill', colorActual);
    });
});

document.getElementById('btnReiniciar').addEventListener('click', function () {
    partes.forEach(function (p) { p.setAttribute('fill', '#ffffff'); });
});

/* ----- Galería ----- */
function svgComoTexto() {
    return svg.outerHTML.replace(' id="tenis"', '');
}

function cargar() {
    try {
        guardados = JSON.parse(localStorage.getItem(CLAVE)) || [];
    } catch (e) {
        guardados = [];
    }
}

function persistir() {
    try {
        localStorage.setItem(CLAVE, JSON.stringify(guardados));
    } catch (e) {}
}

function dibujarGaleria() {
    galeria.innerHTML = '';
    if (guardados.length === 0) {
        galeria.innerHTML = '<p class="galeria-vacia">Aún no has guardado ningún diseño.</p>';
        return;
    }
    guardados.forEach(function (texto, i) {
        var item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = texto +
            '<div class="item-botones">' +
            '<button type="button" data-accion="bajar">Descargar</button>' +
            '<button type="button" data-accion="quitar">Quitar</button>' +
            '</div>';
        item.querySelector('[data-accion="bajar"]').addEventListener('click', function () {
            descargar(texto, 'panam-diseno-' + (i + 1));
        });
        item.querySelector('[data-accion="quitar"]').addEventListener('click', function () {
            guardados.splice(i, 1);
            persistir();
            dibujarGaleria();
        });
        galeria.appendChild(item);
    });
}

document.getElementById('btnGuardar').addEventListener('click', function () {
    guardados.unshift(svgComoTexto());
    persistir();
    dibujarGaleria();
});

/*descargar como PNG */
function descargar(textoSvg, nombre) {
    var conTamano = textoSvg.replace('<svg ', '<svg width="1200" height="800" ');
    var img = new Image();
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1200, 800);
        ctx.drawImage(img, 0, 0, 1200, 800);
        canvas.toBlob(function (blob) {
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = nombre + '.png';
            a.click();
        });
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(conTamano);
}

document.getElementById('btnDescargar').addEventListener('click', function () {
    descargar(svgComoTexto(), 'mi-panam');
});

cargar();
dibujarGaleria();
var btnEnviarDiseno = document.getElementById('btn-enviar-diseno');
var mensajeDiseno = document.getElementById('mensaje-diseno');

btnEnviarDiseno.addEventListener('click', function () {
    mensajeDiseno.textContent = '✔ Tu diseño se ha enviado a Panam. ¡Gracias por tu creatividad!';
    mensajeDiseno.classList.add('visible');

    setTimeout(function () {
        mensajeDiseno.classList.remove('visible');
    }, 5000);
});