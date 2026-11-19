# EL VAR DE LA JUSTICIA
### ¿Quién arbitra cuando el algoritmo decide?

> **🏆 1.ᵉʳ Premio — Categoría Monografías**
> Congreso Internacional *“Inteligencia Artificial en la Justicia: Innovación y Justicia”* · Tucumán, Argentina · 12-13 de noviembre de 2026.
> Comité Evaluador: José Ignacio Pastores, Adolfo Iriarte Yanicelli y Ana María Basualdo.

**🔗 Sitio en vivo:** https://solsalasdata-arch.github.io/var-de-la-justicia-erae/

Landing page interactiva que traduce a una experiencia web la monografía *El VAR de la Justicia: Inteligencia artificial, evaluación de riesgo y el Estándar de Revisabilidad Algorítmica Efectiva (ERAE) en el proceso penal*.

El proyecto cruza **Derecho Penal** e **Inteligencia Artificial / Ciencia de Datos**: toma la metáfora del VAR futbolístico para mostrar por qué un puntaje algorítmico de “riesgo” no puede fundar, por sí solo, una restricción de la libertad, y cómo auditarlo antes de decidir.

> *“Una cifra puede expresar una probabilidad, pero nunca debe confundirse con una sentencia. La inteligencia artificial puede ser asistente de línea. Nunca árbitro.”*

---

## Qué incluye

| Sección | Contenido |
| --- | --- |
| `#inicio` | Hero tipo marcador LED de estadio: **ALGORITMO 0,89 vs ERAE**, con las tres dimensiones del estándar, el reconocimiento del Congreso y accesos al estándar y al caso. |
| `#prologo` | *2050: El partido sin árbitro* vs. la sala penal a las 03:00 AM: repetición VAR paso a paso frente a un monitor que parpadea `0,89 / 1,00 — RIESGO ELEVADO` sin explicación posible. |
| `#caso` | **Caso Mateo** narrado minuto a minuto en la **Sala VAR Jurídica**, con marcador en vivo y controles para pausar, adelantar o ver todo: alerta algorítmica, pedido de prisión preventiva, auditoría técnica que abre la caja negra (registro erróneo, variables proxy, falta de validación local), **prueba de sustracción argumental** con interruptor real y resolución judicial humana fundada en el principio de inocencia y el derecho penal de acto. |
| `#erae` | Las tres dimensiones inseparables del **ERAE** (revisabilidad técnica, procesal y judicial) con checklist interactivo, la regla procesal propuesta y un panel de jurisprudencia comparada y normativa argentina. |
| `#autoras` | Autoría, colaboración interdisciplinaria y fallo oficial del Comité Evaluador. |

**Jurisprudencia y normativa:** *State v. Loomis* (2016), *Ewert v. Canada* (2018), BVerfG (2023), *R (Bridges) v. South Wales Police* (2020), *Glukhin v. Rusia* (2023), *SCHUFA* (TJUE, 2023), *Bayarri vs. Argentina* (Corte IDH, 2008); arts. 18, 19, 43 y 75 inc. 22 CN, Ley 25.326, CPPF y Ley 27.785.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (tema *Dark Legal-Tech & Stadium Pitch*)
- [Lucide Icons](https://lucide.dev/)
- Tipografías: Fraunces (serif editorial), Inter y JetBrains Mono (métricas y puntajes)

Sin backend ni dependencias de datos externas: todo el contenido vive en `src/data/`.

## Desarrollo local

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # type-check + build de producción en dist/
npm run preview   # sirve dist/ en http://localhost:4173
npm run lint
```

## Deploy en Vercel

Importar el repositorio en Vercel: el preset **Vite** se detecta automáticamente (build `npm run build`, output `dist`).

## Estructura

```
src/
├── components/   Navbar, Hero, Prologue, CaseRelato, Erae, Chapter, Authors, Footer
├── data/         caso.ts (Mateo y desglose del puntaje) · erae.ts (pilares, precedentes, normas)
└── index.css     capa de Tailwind y utilidades del tema
```

## Créditos

- **Galilea Selena Churquina** — Autora de la monografía. Estudiante avanzada de Abogacía, Universidad Católica de Salta (UCASAL), Jujuy, Argentina · degalilea03@gmail.com
- **Lic. Sol Brenda Salas** — Colaboración técnica en IA y Ciencia de Datos. Licenciada en Ciencia de Datos (UCASAL), especialista en Inteligencia Artificial, Visión por Computadora y auditoría algorítmica.

> El caso Mateo es hipotético y tiene fines académicos. El desglose del puntaje y la resolución del relato son ilustrativos.
