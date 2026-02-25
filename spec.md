# Specification

## Summary
**Goal:** Restyle the entire website to a strict black-and-white-only theme and add prominent 3D elements (via Three.js/React Three Fiber) to every section.

**Planned changes:**
- Replace all CSS variables, Tailwind config tokens, and component-level colors with a pure black/white/grayscale palette — removing all teal, amber, and any other chromatic colors
- Update the Navbar to use a black background with white text/links and gray-only hover/active states; update the Footer to match the monochrome treatment
- Add at least one Three.js/React Three Fiber 3D decorative element (floating wireframe shapes, rotating geometry, particle clouds, etc.) to each existing section: About, Mission/Vision, Services, Team, and Contact
- Ensure all 3D elements (including the hero scene and Interactive3DCards) use only black/white/gray materials and lighting
- Keep 3D elements performant using low-poly geometry or instancing where needed; add subtle scroll or mouse interaction where appropriate

**User-visible outcome:** The entire website displays in a strict black-and-white aesthetic with rich 3D visual elements present in every section, from the hero down to the contact form, all rendered in monochrome.
