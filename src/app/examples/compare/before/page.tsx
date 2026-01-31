/**
 * BEFORE: Intentionally poor accessibility, SEO, and Core Web Vitals.
 * Run Lighthouse on this page to get a "before" score.
 *
 * Issues on purpose:
 * - Main-thread blocking script + heavy client JS (hurts Performance)
 * - No semantic HTML, wrong heading hierarchy, duplicate ids
 * - Images missing alt, iframe without title
 * - Buttons/links without accessible names, very small touch targets
 * - Form without labels, inputs with duplicate id
 * - Very low contrast text, list not in list markup, table without th
 * - target="_blank" without rel="noopener noreferrer" (Best Practices)
 */
import Image from "next/image";

export default function CompareBeforePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        {/* Bad: div instead of main, no landmark */}
        <div className="title text-2xl font-bold">
          Premium Wireless Headphones
        </div>

        <div className="mt-4 flex gap-6">
          <Image
            src="https://picsum.photos/seed/headphones/300/300"
            alt=""
            width={200}
            height={200}
            className="rounded object-cover"
          />
          <div>
            {/* Bad: very low contrast - a11y */}
            <p
              className="text-sm"
              style={{ color: "#b5b5b5", backgroundColor: "#e8e8e8" }}
            >
              High-quality sound. 30hr battery.
            </p>
            <p
              className="mt-2 text-xs"
              style={{ color: "#aaa", backgroundColor: "#eee" }}
            >
              $199.00
            </p>
            {/* Bad: very small touch target, no accessible name */}
            <button
              type="button"
              className="mt-3 rounded bg-gray-300"
              style={{ outline: "none", width: 18, height: 18, padding: 0 }}
              aria-label=""
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-8">
          <img
            src="https://picsum.photos/seed/banner/800/200"
            alt=""
            className="rounded"
            style={{ width: "100%", maxWidth: 400 }}
          />
        </div>

        <div className="mt-6 flex gap-4">
          <img
            src="https://picsum.photos/seed/1/400/300"
            alt=""
            className="rounded"
          />
          <img
            src="https://picsum.photos/seed/2/400/300"
            alt=""
            className="rounded"
          />
          <img
            src="https://picsum.photos/seed/3/400/300"
            alt=""
            className="rounded"
          />
        </div>

        {/* Bad: iframe without title - a11y */}
        <div className="mt-6">
          <iframe
            src="about:blank"
            width={300}
            height={100}
            style={{ border: "1px solid #ccc" }}
          />
        </div>

        {/* Bad: list not in list markup - a11y */}
        <div className="mt-6">
          <div className="text-lg font-bold">Features</div>
          <div className="mt-1">Noise canceling</div>
          <div className="mt-1">30hr battery</div>
          <div className="mt-1">Bluetooth 5.0</div>
        </div>

        {/* Bad: table without th/scope - a11y */}
        <div className="mt-6 overflow-x-auto">
          <table className="border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Weight</td>
                <td className="border border-gray-300 px-2 py-1">250g</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">Driver</td>
                <td className="border border-gray-300 px-2 py-1">40mm</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bad: form - no labels, duplicate id - a11y + best practice */}
        <div className="mt-8">
          <div className="text-lg font-bold">Newsletter</div>
          <form className="mt-2 flex gap-2">
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="rounded border border-gray-300 px-2 py-1 text-sm"
            />
            <button
              type="submit"
              className="rounded bg-gray-600 px-3 py-1 text-sm text-white"
              style={{ outline: "none" }}
            >
              Subscribe
            </button>
          </form>
          <input
            id="email"
            type="text"
            placeholder="Name"
            className="mt-2 rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>

        {/* Bad: links open in new tab without rel="noopener noreferrer" - Best Practices */}
        <div className="mt-8 text-sm" style={{ color: "#999" }}>
          <a
            href="https://example.com"
            target="_blank"
            className="underline"
            style={{ outline: "none" }}
          >
            Click here
          </a>{" "}
          for more info.{" "}
          <a
            href="https://example.org"
            target="_blank"
            className="underline"
            style={{ outline: "none" }}
          >
            Learn more
          </a>{" "}
          <a
            href="https://example.net"
            target="_blank"
            className="underline"
            style={{ outline: "none" }}
          >
            Support
          </a>
        </div>

        {/* Bad: button with no accessible name, skip heading level */}
        <div className="mt-6 text-2xl font-bold">Related</div>
        <button
          type="button"
          className="mt-2 rounded bg-gray-200 px-2 py-1"
          style={{ outline: "none" }}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
