# D&D Mapp - UI Angular

[![License](https://img.shields.io/github/license/dnd-mapp/dma-ui-angular)](LICENSE)
[![CI Workflow Status](https://img.shields.io/github/actions/workflow/status/dnd-mapp/dma-ui-angular/push-main.yml?branch=main&logo=github&label=CI)](https://github.com/dnd-mapp/dma-ui-angular/actions/workflows/push-main.yml)

## Table of Contents

-  [About the project](#about-the-project)
-  [Development](#development)
   -  [Prerequisites](#prerequisites)
   -  [Setup](#setup)
   -  [Certificates](#certificates)
   -  [Build the library](#building-the-library)
   -  [Running tests](#running-tests)
   -  [Running Storybook](#running-storybook)
-  [Consuming the library](#consuming-the-library)
-  [Contributing](#contributing)
-  [License](#license)

---

## About the project

This repository hosts the `dma-ui-angular` Angular library, a collection of presentational UI components. This library is designed to be published as an npm package to GitHub Packages (GHCR) and consumed by other Angular applications within the D&D Mapp platform.

The primary goal of `dma-ui-angular` is to provide a standardized set of reusable UI components, promoting consistency and speeding up development across various frontend projects. By separating presentational components into a dedicated library, we aim to improve maintainability and allow for independent versioning and distribution.

___

## Development

This project is built using the Angular CLI, v20.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **[Node.js](https://nodejs.org/en/download/) (v24) and npm (Node Package Manager, v11)**: We recommend using [mise-en-place](https://mise.jdx.dev/) to manage your installed version of Node.js and npm globally.
*   **Angular CLI**: Install globally using npm
    ```bash
    npm install -g @angular/cli@~20
    ```
*   **[mkcert](https://github.com/FiloSottile/mkcert)**: Create a new local CA
    ```bash
    mkcert -install
    ```

### Setup

To set up the development environment:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dnd-mapp/dma-ui-angular.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd dma-ui-angular
    ```
3.  **(Optional when using mise-en-place) Install project tools**
    ```bash
    mise install
    ```
4.  **Install project dependencies:**
    ```bash
    npm ci
    ```

### Certificates

1.  **Generate a self-signed certificate to serve the application over HTTPS:** The app is served locally over HTTPS by default. To achieve this, you must generate a self-signed certificate using mkcert.
    ```bash
    mkcert -cert-file certificate.pem -key-file certificate-key.pem localhost.shared-ui.dndmapp.dev localhost
    ```

2.  **Trust the certificate:** To prevent HTTPS warnings from your browser, you must add them as trusted certificates. Follow the steps below for your Operating System:
    <ul>
        <li>
            <details>
                <summary>For Windows:</summary>
                <ol>
                    <li>
                        Press <kbd>&#8862; Win</kbd>+<kbd>R</kbd> to open `Run`.
                    </li>
                    <li>
                        Type `mmc` and press <kbd>⏎ Enter</kbd> to open `Microsoft Management Console` (You may need to accept that this app may make changes to your device).
                    </li>
                    <li>
                        Press <kbd>CTRL</kbd>+<kbd>M</kbd> to add or remove Snap-ins.
                    </li>
                    <li>
                        Add the `Certificates` snap-in, confirm that it'll manage certificates for your user account, and confirm the selection of snap-ins.
                    </li>
                    <li>
                        In the side panel, navigate to `Console Root > Certificates - Current User > Trusted Root Certification Authorities > Certificates`.
                    </li>
                    <li>
                        In the top bar, open the `Action` menu, open the `All Tasks` sub menu, and select the `Import...` task.
                    </li>
                    <li>
                        Click on next to confirm that the store location is for the `Current User`.
                    </li>
                    <li>
                        Click on `Browse...`, navigate to the repository root folder, allow all file types, and select the `certificate.pem`.
                    </li>
                    <li>
                        Continue and finish by placing the certificate under the `Trusted Root Certification Authorities` store (There's no need to save the console settings).
                    </li>
                </ol>
            </details>
        </li>
        <li>
            <details>
                <summary>For macOS:</summary>
                <ol>
                    <li>
                        Press <kbd>⌘ Command</kbd>+<kbd>Space</kbd>.
                    </li>
                    <li>
                        Search for and open `Keychain Access` (You might get prompted to provide your password).
                    </li>
                    <li>
                        Open the root folder of the repository in finder.
                    </li>
                    <li>
                        Make sure that "Keychain Access" has the `login` section open on `All Items`.
                    </li>
                    <li>
                        Drag the certificate from finder into the Keychain Access (You might get an error message "-26276" indicating that the import of the certificate was not possible).
                    </li>
                    <li>
                        Find the certificate by the looking for it by the name `localhost.www.dndmapp.dev`, Right click on it and select `Get Info`.
                    </li>
                    <li>
                        Expand the `Trust` section and set `Secure Sockets Layer (SSL)` to `Always Trust`.
                    </li>
                    <li>
                        You may now close all windows (You might get prompted to provide your password to save the changes).
                    </li>
                </ol>
            </details>
        </li>
        <li>For all Operating Systems: You need to restart your browser after trusting the certificate to complete the process.</li>
    </ul>

3.  **Update the hosts file:** To be able to use the custom host names, you need to update the hosts file. Follow the steps below for your Operating System:
    <ul>
        <li>
            <p>
                The following contents will need to be added to the Hosts file, no matter the OS of your device:
            </p>
            <pre>127.0.0.1    localhost.shared-ui.dndmapp.dev</pre>
        </li>
        <li>
            <details>
                <summary>For Windows:</summary>
                <ol>
                    <li>Run a text editor like Notepad or Notepad++ as Administrator.</li>
                    <li>Open the Hosts file on the following location: <pre>C:\Windows\System32\drivers\etc\hosts</pre></li>
                    <li>Add the contents from above in the file, save, and close the file.</li>
                </ol>
            </details>
        </li>
        <li>
            <details>
                <summary>For macOS:</summary>
                <ol>
                    <li>Open a terminal.</li>
                    <li>
                        Using your favorite CLI text editor tool, open the hosts file located at: <pre>/etc/hosts</pre> (You might need to use <code>sudo</code> to have write permissions for this file).
                    </li>
                    <li>Add the contents from above in this file. After that you may save and close the file.</li>
                </ol>
            </details>
        </li>
    </ul>

### Building the library

To build the `dma-ui-angular` library:

```bash
pnpm build
```

The compiled library will be output to the `dist/dma-ui-angular` directory.

### Running Tests

To run the unit tests for the library:

```bash
pnpm test
```

### Running Storybook

Storybook is used to develop, test, and document components in isolation.

To start Storybook for the `dma-ui-angular` library:

```bash
pnpm storybook
```

This command will typically start a development server and open Storybook in your browser (at `https://localhost.shared-ui.dndmapp.dev:4100`).

---

## Consuming the library

Once published, the `dma-ui-angular` npm package can be installed and used in other Angular applications. For detailed instructions on installation, usage, and available components, please refer to the [README](libs/dma-ui-angular/README.md) of the library that is included in the package and in this repository.

## Contributing

We welcome contributions! If you're interested in contributing to`dma-ui-angular`, please review our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://opensource.org/licenses/AGPL-3.0). See the [LICENSE](LICENSE) file for details.
