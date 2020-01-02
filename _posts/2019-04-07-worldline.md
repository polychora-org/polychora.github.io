---
title: Worldline
preview: /assets/img/worldline.gif
tags: [software]
---

<style type="text/css">
.observablehq h1 {
    display:none;
}
.observablehq--inspect {
    display: none;
}
</style>
<link itemprop="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@3/dist/inspector.css" type="text/css" />
<div id="observablehq-12d3f1eb" style="width: 80%;"></div>
<script type="module">
import {Runtime, Inspector, Library} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import notebook from "https://api.observablehq.com/@corajr/worldline.js?v=3";
const inspect = Inspector.into("#observablehq-12d3f1eb");
const runtime = new Runtime(Object.assign(new Library, {width: 640}));
runtime.module(notebook, inspect);
</script>

[View/Fork on Observable](https://observablehq.com/@corajr/worldline)

Originally prototyped using Pure Data and GEM.

Prototype source on Github at [polychora-org/worldline-pd](https://github.com/polychora-org/worldline-pd)

