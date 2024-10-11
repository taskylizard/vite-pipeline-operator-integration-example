import { defineConfig } from "vite";
import { babel } from "@rollup/plugin-babel";

export default defineConfig({
	plugins: [
		babel({
			extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
			babelHelpers: "runtime",
		}),
		{
			name: "custom:adjust-order",
			configResolved(c) {
				movePlugin(c.plugins, "babel", "before", "vite:esbuild");
			},
		},
	],
});

export function movePlugin(
  plugins: { name: string }[],
  pluginAName: string,
  order: 'before' | 'after',
  pluginBName: string
) {
  const pluginBIndex = plugins.findIndex((p) => p.name === pluginBName)
  if (pluginBIndex === -1) return

  const pluginAIndex = plugins.findIndex((p) => p.name === pluginAName)
  if (pluginAIndex === -1) return

  if (order === 'before' && pluginAIndex > pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0]
    plugins.splice(pluginBIndex, 0, pluginA)
  }

  if (order === 'after' && pluginAIndex < pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0]
    plugins.splice(pluginBIndex, 0, pluginA)
  }
}
