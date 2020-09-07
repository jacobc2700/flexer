# HTML Theme for Flexer

Here is the HTML theme for Flexer.

### Technologies:

- HTML5.
- CSS (Flexbox, Grid, SASS):

* Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/ (only use for small component layouts).
* Grid: https://css-tricks.com/snippets/css/complete-guide-grid/ (only use for larger scale layouts).
* SASS: https://sass-lang.com/guide.

- Font Awesome (Icons) & Google Fonts (Roboto).

### Structure:

- `dist`: this folder contains our distributable HTML and CSS code.
- These files can be used directly by others (no need to compile any SASS).
- `dist/css/style.min.css`: compiled CSS file created from SASS code (never touch this file).
- `resources`: this folder just has a template HTML file.
- `scss`: this folder contains our CSS & SASS styles (only edit scss files).
- Using the "Live Sass Compiler" extension in Visual Studio Code allows us to compile the SASS code into CSS code.
- This is my `settings.json` file for Visual Studio Code (https://gyazo.com/f166c2bae5d75bed86c48f0d4c4b0ded).
- Here are what each of the SASS files are responsible for:
- `scss/_config.scss`: configuration file for color variables, functions, and mixins.

### Tips (CSS & SASS):

- Ampersand (&) is a placeholder for the main selector.

```
.header {
    &-main {
        color: blue;
    }
}
```

- The snippet above gives elements with class name (.header-main) the blue color.
- Always use `rem` units (they are superior): 1 rem = font size for root `html` element (default: 16px).

- Might need to update font awesome cdn version
<!-- <script
      src="https://kit.fontawesome.com/4e27ae35df.js"
      crossorigin="anonymous"
    ></script> -->
- Command + F: all the icons ("i class")
