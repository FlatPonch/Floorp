/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const EXPORTED_SYMBOLS = ["_applyColorwayConfig", "BuiltInThemeConfig"];

const { AppConstants } = ChromeUtils.import(
  "resource://gre/modules/AppConstants.jsm"
);
const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

/**
 * A Map of themes built in to the browser, alongwith a Map of collections those themes belong to. Params for the objects contained
 * within the map:
 * @param {string} id
 *   The unique identifier for the theme. The map's key.
 * @param {string} version
 *   The theme add-on's semantic version, as defined in its manifest.
 * @param {string} path
 *   Path to the add-on files.
 * @param {string} [expiry]
 *  Date in YYYY-MM-DD format. Optional. If defined, the themes in the collection can no longer be
 *  used after this date, unless the user has permission to retain it.
 * @param {string} [collection]
 *  The collection id that the theme is a part of. Optional.
 */
const BuiltInThemeConfig = new Map([
  [
    "firefox-compact-light@mozilla.org",
    {
      version: "1.2",
      path: "resource://builtin-themes/light/",
    },
  ],
  [
    "firefox-compact-dark@mozilla.org",
    {
      version: "1.2",
      path: "resource://builtin-themes/dark/",
    },
  ],
  [
    "firefox-alpenglow@mozilla.org",
    {
      version: "1.4",
      path: "resource://builtin-themes/alpenglow/",
    },
  ],
  [
    "2022red-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/2022red/",
    },
  ],
  [
    "2022orange-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/2022orange/",
    },
  ],
  [
    "2022green-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/2022green/",
    },
  ],
  [
    "2022yellow-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/2022yellow/",
    },
  ],
  [
    "2022purple-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/2022purple/",
    },
  ],
  [
    "2022blue-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/2022blue/",
    },
  ],
  [
    "lush-soft-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/lush/soft/",
    },
  ],
  [
    "lush-balanced-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/lush/balanced/",
    },
  ],
  [
    "lush-bold-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/lush/bold/",
    },
  ],
  [
    "abstract-soft-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/abstract/soft/",
    },
  ],
  [
    "abstract-balanced-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/abstract/balanced/",
    },
  ],
  [
    "abstract-bold-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/abstract/bold/",
    },
  ],
  [
    "elemental-soft-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/elemental/soft/",
    },
  ],
  [
    "elemental-balanced-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/elemental/balanced/",
    },
  ],
  [
    "elemental-bold-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/elemental/bold/",
    },
  ],
  [
    "cheers-soft-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/cheers/soft/",
    },
  ],
  [
    "cheers-balanced-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/cheers/balanced/",
    },
  ],
  [
    "cheers-bold-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/cheers/bold/",
    },
  ],
  [
    "graffiti-soft-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/graffiti/soft/",
    },
  ],
  [
    "graffiti-balanced-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/graffiti/balanced/",
    },
  ],
  [
    "graffiti-bold-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/graffiti/bold/",
    },
  ],
  [
    "foto-soft-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/foto/soft/",
    },
  ],
  [
    "foto-balanced-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/foto/balanced/",
    },
  ],
  [
    "foto-bold-colorway@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/monochromatic/foto/bold/",
    },
  ],
  [
    "floorp-material@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/material/",
    },
  ],
  [
    "floorp-photon@mozilla.org",
    {
      version: "1.0",
      path: "resource://builtin-themes/photon/",
    },
  ],
]);

const colorwayClosetEnabled = Services.prefs.getBoolPref(
  "browser.theme.colorway-closet"
);

const ColorwayCollections = [
  {
    id: "life-in-color",
    expiry:
      colorwayClosetEnabled && AppConstants.NIGHTLY_BUILD
        ? "2022-08-03"
        : "2022-02-08",
    l10nId: "colorway-collection-life-in-color",
  },
  {
    id: "true-colors",
    expiry:
      colorwayClosetEnabled && AppConstants.NIGHTLY_BUILD
        ? "2022-04-20"
        : "2022-05-03",
    l10nId: "colorway-collection-true-colors",
  },
];

function _applyColorwayConfig(collections) {
  const collectionsSorted = collections
    .map(({ expiry, ...rest }) => ({
      expiry: new Date(expiry),
      ...rest,
    }))
    .sort((a, b) => a.expiry - b.expiry);
  const collectionsMap = collectionsSorted.reduce((map, c) => {
    map.set(c.id, c);
    return map;
  }, new Map());
  for (let [key, value] of BuiltInThemeConfig.entries()) {
    if (value.collection) {
      const collectionConfig = collectionsMap.get(value.collection);
      BuiltInThemeConfig.set(key, {
        ...value,
        ...collectionConfig,
      });
    }
  }
  BuiltInThemeConfig.findActiveColorwayCollection = now => {
    let collection = null;
    let start = 0;
    let end = collectionsSorted.length - 1;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const c = collectionsSorted[mid];
      const diff = c.expiry - now;
      if (diff < 0) {
        // collection expired, look for newer one
        start = mid + 1;
      } else {
        // collection not expired, check for older one
        collection = c;
        end = mid - 1;
      }
    }
    return collection;
  };
}

_applyColorwayConfig(ColorwayCollections);
