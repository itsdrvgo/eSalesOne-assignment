await Bun.build({
    entrypoints: ["./src/app.ts"],
    outdir: "./build",
    target: "bun",
    sourcemap: "linked",
    minify: true,
    external: ["axios", "express", "zod"],
    root: "./src",
});
