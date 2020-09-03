# HTML Theme for Flexer

Here is the HTML theme for Flexer.

### Technologies:

- HTML.
- CSS (Flexbox, Grid, SASS):

* Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/.
* SASS: https://sass-lang.com/guide.

- Font Awesome & Google Fonts (Raleway).

### Structure:

- `dist`: this folder contains our distributable HTML and CSS code.
- These files can be used directly by others (no need to compile any SASS).

style.min.css = compiled css file, compiled from running Watch Sass through Live Sass Compiler on VSCODE

never touch this file
only edit scss file
https://gyazo.com/f166c2bae5d75bed86c48f0d4c4b0ded

separate file for variables/mixins/functions: \_config.scss (partial)
separate file for utilities:

mixin: outputs what you put there
functions, if/else

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

color scheme
font

grid vs. flexbox?

Note: Flexbox layout is most appropriate to the components of an application, and small-scale layouts, while the Grid layout is intended for larger scale layouts.
