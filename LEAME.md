# Libretos: lector de libretos para el celular

App web instalable (PWA) que abre los libretos `.md` de las videoclases y avanza
a medida que usted los lee en voz alta.

## Publicarla en GitHub Pages (una sola vez)

1. En GitHub, cree un repositorio nuevo, por ejemplo `libretos`.
2. Suba **todos** los archivos de esta carpeta (index.html, sw.js, manifest.webmanifest y los íconos).
3. Vaya a Settings → Pages → Source: «Deploy from a branch», rama `main`, carpeta `/ (root)`. Guarde.
4. En uno o dos minutos la app queda en `https://SU-USUARIO.github.io/libretos/`.

## Instalarla en el teléfono

1. Abra esa dirección en **Chrome** para Android.
2. Menú ⋮ → «Instalar app» (o «Añadir a pantalla de inicio»).
3. Ábrala desde el ícono. La primera vez que use el modo voz, permita el micrófono.

La app funciona sin internet, salvo el modo voz, que usa el reconocimiento de Google.

## Cargar libretos

- **Abrir archivo .md**: desde Archivos, Descargas o Drive.
- **Compartir**: en Archivos o Drive, mantenga presionado un `.md` → Compartir → Libretos (solo con la app instalada).
- **Desde enlace**: pegue el enlace de GitHub del libreto (por ejemplo, si guarda la carpeta `guiones/` en un repositorio).
- **Pegar texto**.

Si vuelve a cargar un archivo con el mismo nombre, se reemplaza la versión anterior.

## Al grabar

- El modo voz necesita el micrófono de **este** teléfono. Grabe el audio en otro equipo (computador o el teléfono principal); si graba en el mismo teléfono, use el modo automático.
- En algunos Android el reconocimiento hace un pitido corto cada vez que se reinicia; por eso conviene que el micrófono de grabación esté en otro equipo y algo alejado del teléfono lector.
- El modo automático deja 1 s de silencio al inicio de cada escena, como pide el libreto.
- En «Escenas» (toque el botón E01 arriba a la derecha) puede saltar a cualquier escena y copiar los tiempos medidos en formato `duraciones.json`.
- Teclado o control Bluetooth: espacio inicia o pausa · ← → cambian de escena · ↑ ↓ mueven unas palabras · + − cambian el ritmo.

## Actualizar la app

Si cambia algún archivo, súbalo de nuevo a GitHub y cambie `libretos-v1` por `libretos-v2` en `sw.js`.
