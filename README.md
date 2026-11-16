# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Deploy to DEV on Windows

PowerShell may block the `npm.ps1` shim under the machine's execution policy.
Use `npm.cmd` to run the deploy script without changing that policy:

```powershell
npm.cmd run deploy:dv
```

The script builds the DEV bundle and deploys it using configuration from
`$env:CINEMATOGRAPHY_CONFIG_DIR\gui\cinematography-gui-config-dv.yml`. Set
`CINEMATOGRAPHY_CONFIG_DIR` to the external configuration directory before
running it. The file must contain `API_BASE_URL`, `AUTH_LOGIN_URL`,
`NGINX_ROOT`, and `NGINX_BACKUP_ROOT`. `AUTH_LOGIN_URL` must be the full login
endpoint provided by the backend. A starter template is in
`.devops/config/cinematography-gui-config-TEMPLATE.yml`; copy it outside the repository
and fill in the environment-specific values. The deployment script is
`.devops/deploy.ps1`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
