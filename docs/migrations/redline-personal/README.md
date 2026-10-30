# redline-personal consolidation

The portfolio source formerly maintained in `devoralabsapp/redline-personal` is now in [`demos/portfolio`](../../../demos/portfolio). Its source revision before migration is `fde1ebe1d09ed2e5cf29cfa6574713133dbcfb30`.

The subtree import retains the original main branch as a real Git parent, without squashing its commit history. The new explorer navigation calls the former Web 1 **Demo 1**, and the former Web 2 **Demo 2**:

- `https://motion.devoralabs.tech/#view=demo1`: six Portfolio styles.
- `https://motion.devoralabs.tech/#view=demo2`: three Creative Lab styles.
- `demoStyle=classic|one-line|kinetic|layers|blueprint|orbit` selects Demo 1's style.
- `demoTheme=frame-shift|cobalt-court|cutout-dept` selects Demo 2's direction.
- `demoLang=vi|en` selects the embedded language.

The parent keeps each Demo 1 style mounted once, and changes Demo 2's theme on the same frame. Frames and local application data survive switching to Motion Lab, the library or In practice. Each frame has a distinct DOM and local asset paths. The bridge accepts only same-origin messages from its parent and controls visibility, language and presentation preferences. It never mutates orders, carts, approval state or form values.

The explorer build executes the imported portfolio's static build, preserving its fingerprinted Creative Lab assets, then places the result at `/demos/portfolio/`. It injects the integration bridge only into the build output. The old standalone switcher is retained for reference and now labels the two families Demo 1/Demo 2. The old repo's Vercel project is not the host of these integrated demos; the explorer's existing Git deployment serves them.

## Preserved repository data

Remote archival tags in **web-motion-system-skill** retain the original pointers:

- `archive/redline-personal/branches/*`: all 11 original branches.
- `archive/redline-personal/pulls/1` through `/10`: original PR head commits.
- `archive/redline-personal/tags/v1.1-current`: the original release tag.

Fetch the archive with `git fetch origin --tags`, then inspect a revision with, for example, `git log archive/redline-personal/branches/main`. These are archival tags so they do not create active development branches or trigger unnecessary preview deployments.

`repository.json` exports the source repository metadata, branch/tag pointers, releases and issues. Ten `pull-<number>.json` files export original PR details, discussion comments, reviews, review comments and commit lists. These JSON records preserve historical context; they are not replacement GitHub pull requests with live review UI. There were no standalone issues or releases at export time. CI run logs, deployment records and repository settings remain service-specific and are not migrated as live resources.

A local Git bundle was also made before migration at `../redline-delivery/redline-personal-before-migration.bundle` relative to this checkout's root. Keep that file outside the public build. Imported screenshots, previous tests and design documentation remain in the source folder, but the public static build publishes only runtime assets.

## Validation

```sh
npm run build
npm run demos:check
# With npm run dev serving in another terminal:
npm run demos:verify
```

The browser check covers all nine directions, real cart and form interaction, switching views and themes without state loss, VI/EN, host Pause motion, hidden frames and responsive/reduced-motion layouts.

The source repository is deleted only after the consolidated main branch and archive refs are pushed, and the integrated demos are verified on the production domain. A GitHub credential with `delete_repo` scope is required for that final operation.
