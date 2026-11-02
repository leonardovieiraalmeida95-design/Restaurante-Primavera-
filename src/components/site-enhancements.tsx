"use client";

import { useEffect } from "react";

export default function SiteEnhancements() {
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".progress span");
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.floating a[href^="#"]'));
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.getAttribute("href") ?? ""))
      .filter((section): section is HTMLElement => Boolean(section));
    const cursor = document.querySelector<HTMLElement>(".pizza-cursor");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      if (progress) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
      }
      document.querySelector<HTMLElement>(".hero")?.style.setProperty(
        "--parallax",
        reducedMotion ? "0px" : `${Math.min(36, window.scrollY * 0.035)}px`,
      );
    };

    const requestScrollUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    updateScroll();

    const observers: IntersectionObserver[] = [];
    if ("IntersectionObserver" in window) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          const active = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!active) return;
          links.forEach((link) => {
            if (link.hash === `#${active.target.id}`) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        },
        { rootMargin: "-34% 0px -56% 0px", threshold: [0, 0.12, 0.3, 0.55] },
      );
      sections.forEach((section) => navObserver.observe(section));
      observers.push(navObserver);

      if (!reducedMotion) {
        document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
          const revealObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                element.classList.add("seen");
                revealObserver.disconnect();
              });
            },
            { threshold: 0.12 },
          );
          revealObserver.observe(element);
          observers.push(revealObserver);
        });

        document.querySelectorAll<HTMLElement>("main h1, main h2").forEach((heading) => {
          const accessibleText = heading.innerText.replace(/\s+/g, " ").trim();
          heading.setAttribute("aria-label", accessibleText);
          const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
          const textNodes: Text[] = [];
          while (walker.nextNode()) {
            const textNode = walker.currentNode as Text;
            if (textNode.nodeValue?.trim()) textNodes.push(textNode);
          }
          let order = 0;
          textNodes.forEach((node) => {
            const fragment = document.createDocumentFragment();
            Array.from(node.nodeValue ?? "").forEach((character) => {
              if (/\s/.test(character)) {
                fragment.append(document.createTextNode(character));
                return;
              }
              const letter = document.createElement("span");
              letter.className = "letter-in";
              letter.setAttribute("aria-hidden", "true");
              letter.style.setProperty("--letter-order", String(order++));
              letter.textContent = character;
              fragment.append(letter);
            });
            node.replaceWith(fragment);
          });
        });

        const letterObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("letters-visible");
              letterObserver.unobserve(entry.target);
            });
          },
          { threshold: 0.25, rootMargin: "0px 0px -4% 0px" },
        );
        document.querySelectorAll<HTMLElement>("main h1, main h2").forEach((heading) => letterObserver.observe(heading));
        observers.push(letterObserver);
      }
    }

    const moveCursor = (event: MouseEvent) => {
      if (!cursor) return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("visible");
    };
    const hideCursor = () => cursor?.classList.remove("visible");
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (cursor && hasFinePointer) {
      window.addEventListener("mousemove", moveCursor, { passive: true });
      window.addEventListener("mouseleave", hideCursor);
    }

    return () => {
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      observers.forEach((observer) => observer.disconnect());
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
