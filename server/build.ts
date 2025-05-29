await Bun.build({
    entrypoints: ["./src/app.ts"],
    outdir: "./build",
    target: "bun",
    sourcemap: "inline",
    minify: true,
    external: ["axios", "express", "zod"],
    root: "./src",
});
