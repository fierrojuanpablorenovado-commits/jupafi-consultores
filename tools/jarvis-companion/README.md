# JARVIS JP Companion (Windows)

Componente local para activar el Command Center con doble aplauso.

## Qué hace

- Escucha el micrófono **solo de forma local**.
- Detecta dos transitorios tipo aplauso dentro de una ventana corta.
- No guarda grabaciones ni envía audio a internet.
- Al activarse, abre `https://jupaficonsultores.com/control/jarvis` en el navegador.
- Una vez abierto el Command Center, el botón de micrófono permite dictar comandos desde Chrome.

## Requisitos

- Windows 10/11
- Python 3.11+
- Micrófono habilitado

## Instalación

```powershell
cd tools\jarvis-companion
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python jarvis_companion.py
```

Para ver dispositivos de audio:

```powershell
python jarvis_companion.py --list-devices
```

Para seleccionar un micrófono específico:

```powershell
python jarvis_companion.py --device 2
```

Para apuntar a una URL de preview:

```powershell
python jarvis_companion.py --url "https://TU-PREVIEW.vercel.app/control/jarvis"
```

## Arranque automático en Windows

La forma más simple es crear un acceso directo a un `.bat` que active el entorno virtual y ejecute el companion, y colocar el acceso directo en `shell:startup`.

Ejemplo `start-jarvis.bat`:

```bat
@echo off
cd /d C:\ruta\jupafi-consultores\tools\jarvis-companion
call .venv\Scripts\activate.bat
python jarvis_companion.py
```

## Ajuste de sensibilidad

Si hay falsos positivos o el micrófono es poco sensible, ajusta en `ClapDetector`:

- `energy_multiplier`: subirlo reduce falsos positivos.
- `min_rms`: subirlo exige aplausos más fuertes.
- `max_interval`: tiempo máximo permitido entre aplausos.

## Fase siguiente

Se puede añadir `openWakeWord` como segundo factor local (`doble aplauso -> Hey Jarvis`) y posteriormente usar un cliente Realtime persistente para conversación sin depender del reconocimiento de voz del navegador.
