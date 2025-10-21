# Icon Component Generator for Angular

This CLI program simplifies the creation of Angular components for Font Awesome icons. It automates the process of taking an SVG icon and generating a reusable Angular component, ready to be integrated into your Angular library.

## Features

*  **Automated Component Generation:** Quickly create Angular components from SVG icon files.
*  **Prompt-driven Interface:** Guides users through the generation process with clear prompts.
*  **Integration with Existing Libraries:** Designed to seamlessly add new icon components to your Angular icon library.
*  **Font Awesome Ready:** Specifically tailored to work with Font Awesome SVG icons.

## Usage

To generate an icon component, follow these steps:

1.  **Prepare your SVG icon:**
    Place the Font Awesome SVG icon you want to convert into the `component-template.svg` file located in the same directory as this script.

    **Example `component-template.svg` content:**
    ```svg
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
    ```

2.  **Run the generator:**
    Execute the following command in your terminal:
    ```bash
    npm run generate-icon
    ```

3.  **Follow the prompts:**
    The script will guide you through the process, asking for necessary information such as the icon's name and type (`solid` or `regular`). Once completed, your new Angular icon component will be generated and placed alongside the other existing icon components.
