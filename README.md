# MailBox-Demo

Proyecto Template usando Ionic para demostrar el uso de un cliente de Correos. Altamente basado en Gmail de Google.
El proyecto fue creado con fines académico y resolver cómo se haría cada zona con Ionic y con dos puntos de vistas: Web y Android (para iOS por ahora no está implementado).

Puedes ver el ejemplo en vivo aquí: https://hf1nacl.github.io/MailBox-Demo/

---

## ¿Qué te vas a encontrar en este Template?

Este es un punto de Partida en el que tienes un Cliente de Correo hecho en Ionic + Vue + TS, preconfigurado para funcionar en Android y Web. (Pendiente de realización para iOS)
Este proyecto es para aquellas personas que deseen aprender y hacer Cliente de Correo. Toda persona que sepa Vue y también Ionic, podrá adaptar correctamente este proyecto a las vistas correspondientes. No requieres conocimientos de Capacitor, ya hay un Composable que detecta si estas en Web o en Mobile para que puedas ajustar tu vista.

Verás que hay una Bandeja de Entrada de ejemplo y puedes interactuar para "Leer" (Ajusta solamente el estado de Leído por ahora), Favorito y seleccionado. El Header y el Sidebar igual varía dependiendo de la Plataforma. Incluso el SplitPane es ajustado cuando la pantalla es Small y diferente. Por ahora solo tiene una vista que es la ya mencionada Bandeja de Entrada.

Los Mocks están preparados para específicamente simular que tienes correo. Puedes deshabilitar en el .env para dejarlo vacío. Y no se ha trabajado en un Backend porque se espera que lo llegas a necesitar, uses el que tengas. Eso es totalmente tuyo.

---

## Tecnologías Utilizadas

- Lenguaje: Vue y TS con Ionic.
- Build Tool: Vite.
- Entorno: Visual Studio Code.

## Cómo probarlo localmente:

Haz el típico `git clone` y su respectivo `npm i` para reconstruir paquetes.
Igualmente verás que hay un `.env.template` que podrás habilitar los mocks correspondientes, tanto para Web como para Mobile.
Ejecuta el programa con `ionic serve` y se levantará automáticamente.
No hace falta que configures adicionalmente para Android, con solo hacer `npm run build` y su respectivo `npx cap sync` ya estás sincronizando para probarlo en Android Studio para instalar en tu dispositivo Android o emularlo.

### Archivos específicos

(En construcción)

-Cambiar nombre de App: `capacitor.config.ts` tiene la respuesta.
-Conectar API en vez de Mocks: Pendiente.

### Notas finales

Este proyecto es un plano para un Cliente de Correo, en el que no hay intención de infringir la Propiedad Intelectual de Google y relacionados, por lo que si eres Google y hay algo que necesites decir y/o aclarar, puedes contactar para quitar elementos necesarios. En otro caso, este es un proyecto demostrativo.
Si tienes preguntas, no dudes en hacerlo. Esto me ayudará a construir esta documentación de una forma muy específica.
