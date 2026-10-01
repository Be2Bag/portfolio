import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../out/index.html', import.meta.url), 'utf8');
const canonical = 'https://www.be2bag.dev/';

test('contact phone matches the displayed number', () => {
  assert.match(html, /href="tel:\+66631067421"/);
  assert.match(html, /063 106 7421/);
  assert.doesNotMatch(html, /tel:\+1234567890/);
});

test('primary navigation and resume are exported', () => {
  for (const section of ['home', 'skills', 'projects', 'contact']) {
    assert.match(html, new RegExp(`href="#${section}"`));
    assert.match(html, new RegExp(`id="${section}"`));
  }
  assert.match(html, /href="\/resume.pdf"/);
  assert.ok(existsSync(new URL('../out/resume.pdf', import.meta.url)));
  assert.equal(readFileSync(new URL('../out/resume.pdf', import.meta.url)).subarray(0, 5).toString(), '%PDF-');
});

test('search metadata describes the actual backend portfolio', () => {
  assert.match(html, /<title>Panupong Songsaksri.*Node.js.*Go Backend Developer<\/title>/);
  assert.equal(new URL(html.match(/<link rel="canonical" href="([^"]+)"/)[1]).href, canonical);
  assert.match(html, /name="description" content="[^"]*Node.js[^"]*Go[^"]*Bangkok/);
  assert.doesNotMatch(html, /name="robots" content="[^"]*noindex/);
  assert.equal(new URL(html.match(/property="og:url" content="([^"]+)"/)[1]).href, canonical);
  assert.match(html, /property="og:image" content="https:\/\/www.be2bag.dev\/profile.jpg"/);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.match(html, /<main>/);
});

test('profile structured data and discovery files are valid', () => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'Profile JSON-LD script exists');
  const profile = JSON.parse(match[1]);
  assert.equal(profile['@type'], 'ProfilePage');
  assert.equal(profile.url, canonical);
  assert.equal(profile.mainEntity.name, 'Panupong Songsaksri');
  assert.equal(profile.mainEntity['@type'], 'Person');
  assert.equal(profile.mainEntity.address.addressLocality, 'Bangkok');
  const robots = readFileSync(new URL('../out/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/www.be2bag.dev\/sitemap.xml/);
  const sitemap = readFileSync(new URL('../out/sitemap.xml', import.meta.url), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/www.be2bag.dev\/<\/loc>/);
  assert.equal((sitemap.match(/<loc>/g) || []).length, 1);
});
