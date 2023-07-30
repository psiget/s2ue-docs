# [STALKER on UE Docs](https://s2ue.org)

Website for modification "[STALKER on UE](https://s2ue.org)"

```bash
pnpm install
```

```bash
pnpm dev
```

And visit `localhost:3000` to preview your changes.

## Getting Started

### File Organization

First, the system collects all your Markdown files and configurations from the `pages` directory, and then generates the "page map information" of your website to display elements such as the _navigation panel_ and _sidebar_ below:

#### File Structure

The file structure has the following format: `{category}/{file-name}.{language}.mdx`.

Available languages:

- `ru` - Russian
- `en` - English
- `uk` - Ukrainian

### Default Behavior

By default, the site map contains all `.md` and `.mdx` file names and the directory structure, sorted alphabetically. The system will then use the [title](https://github.com/vercel/title) package to obtain formatted page names from the file names.

For example, if you have the following structure:

```text
pages/
  contact.md
  index.mdx
  about/
    legal.md
    index.mdx
```

The resolved site map would look like this (note that all names have been sorted alphabetically):

```json
[
  {
    "name": "About",
    "children": [{ "name": "Index" }, { "name": "Legal" }]
  },
  { "name": "Contact" },
  { "name": "Index" }
]
```

And the global site map will be merged with each Documentation page. Then, the configured theme will display the actual user interface using this site map.

### `_meta.json` Configuration

Very often, it is required to customize the title of each page instead of simply using the file name. For example, having a page with the title "Index" doesn't make sense; instead, it's better to use the title "Home".

This is where the `_meta.json` file comes in handy. You can place an `_meta.json` file in each directory, and it will be used to override the default configuration for each page:

```text
pages/
  _meta.json
  contact.md
  index.mdx
  about/
    _meta.json
    legal.md
    index.mdx
```

And you can place the following code in the `pages/_meta.json` file:

```json filename="pages/_meta.json"
{
  "index": "My Homepage",
  "contact": "Contact Us",
  "about": "About Us"
}
```

It informs the system about the order of each page and the correct title. Additionally, you can do this with `title` and add other configurations to it:

```json filename="pages/_meta.json"
{
  "index": "My Homepage",
  "contact": "Contact Us",
  "about": {
    "title": "About Us",
    "...additional configurations...": "..."
  }
}
```

Additional configurations are passed to the **theme** as extra information. For more information, refer to the relevant pages.
